// Every maze should have
// Start location
// End location
// Compressed Maze

class Maze {
	// End location isn't a cell... because it doesn't have walls
	public StartLocation: any;
	public EndLocation: any;

	public GridLayers: number;
	public GridWidth: number;
	public GridHeight: number;
	public MazeGrid: Cell[][][];

	public MazePath: string;
	public MazeTemplateCompressed: string;

	public MazeDifficulty: number = 0;
	public BestPath: string = "";

	private Utilities = new Utils();

	private MazeSolved: boolean = false;

	constructor(
		public gridLayers: number,
		public gridWidth: number,
		public gridHeight: number,
		public mazeTemplateCompressed?: string,
		public startLocation?: any,
		public endLocation?: any) {

		this.GridLayers	= gridLayers;
		this.GridWidth	= gridWidth;
		this.GridHeight	= gridHeight;

		// generate the grid
		this.MazeGrid = this.generateGrid();

		if (mazeTemplateCompressed !== undefined) {
			// Procedural generated path
			this.MazeTemplateCompressed = mazeTemplateCompressed;
			this.MazePath = this.fillMazeProcedural(this.MazeTemplateCompressed);
		} else {
			// Random generated path
			if (startLocation === undefined) {
				this.StartLocation = {
					Z: 0,
					Y: 0,
					X: 0,
				};
			} else {
				this.StartLocation = startLocation;
			}
			if (endLocation === undefined) {
				this.EndLocation = {
					Z: 0,
					Y: this.Utilities.getRandomIntInclusive(1, this.GridHeight - 1),
					X: this.Utilities.getRandomIntInclusive(1, this.GridWidth - 1),
				};
			} else {
				this.EndLocation = endLocation;
			}
			this.MazePath = this.fillMazeRandom();

			this.MazeTemplateCompressed = LZString.compressToEncodedURIComponent(
				this.MazePath
				+ "|" + JSON.stringify(this.StartLocation)
				+ "|" + JSON.stringify(this.EndLocation));
		}
	}

	public SetMazeSolvedToFalse() {
		this.MazeSolved = false;
	}

	public IsMazeSolved(currentLocation: any) {
		// If the maze has already been solved, don't change that fact
		if (this.MazeSolved) {
			return true;
		} else {
			return this.MazeSolved = (currentLocation.Z === this.EndLocation.Z
				&& currentLocation.Y === this.EndLocation.Y
				&& currentLocation.X === this.EndLocation.X);
		}
	}

	public determineMazeDifficulty(attempts: number = 3000) {
		let lowest = Number.MAX_VALUE;
		let path = "";
	
		for (let i = 0; i < attempts; i++) {
			let MyNavigator: MazeNavigator = new MazeNavigator(this);
			MyNavigator.Navigate();
			if (MyNavigator.attempts < lowest) {
				lowest = MyNavigator.attempts;
				path = MyNavigator.path;
			}
		}
		this.MazeDifficulty = lowest;
		this.BestPath = path;
	
		// let t0 = performance.now();
		// let t1 = performance.now();
		// let tTotal = t1-t0;
		// console.log("Total time in seconds: " + tTotal / 1000);
	}

	private generateGrid() {
		const tempGrid: any[] = new Array(this.GridLayers);
		for (let i = 0; i < this.GridLayers; i++) {
			tempGrid[i] = new Array(this.GridHeight);
			for (let j = 0; j < this.GridHeight; j++) {
				tempGrid[i][j] = new Array(this.GridWidth);
				tempGrid[i][j].fill();
			}
		}
		return tempGrid;
	}

	/**
	 * Given a decompressed path, returns a maze path for a procedural maze
	 * @param mazeTemplateCompressed given decompressed string of directions (a path)
	 */
	private fillMazeProcedural(mazeTemplateCompressed: string) {
		const result1 = this.Utilities.getLocationsFromTemplate(mazeTemplateCompressed);

		// tslint:disable-next-line:prefer-const
		let template: string[] = result1.Path;
		this.EndLocation = result1.End;
		this.StartLocation = result1.Start;

		// tslint:disable-next-line:prefer-const
		let cellsList: Cell[] = [new Cell(0, 0, 0)];

		let next: string | undefined;
		let mazePath: string = "";
		let index: number = -1;

		while (cellsList.length > 0) {
			// index is the newest
			index = cellsList.length - 1;

			const currentCell: Cell = cellsList[index];

			next = template.shift();

			if (next === "" || next === undefined) {
				break;
			} else if (next === this.Utilities.Back) {
				cellsList.splice(index, 1);
			} else {
				const nextCell: Cell = this.directionModifier(cellsList[index], next);
				const result2: any = this.carvePathBetweenCells(currentCell, nextCell, next);

				this.MazeGrid[currentCell.Z][currentCell.Y][currentCell.X] = result2.current;
				this.MazeGrid[nextCell.Z][nextCell.Y][nextCell.X] = result2.next;
				cellsList.push(nextCell);
				index = -1;
			}
			if (index !== -1) {
				cellsList.splice(index, 1);
			}
			mazePath += next;
		}
		return mazePath;
	}

	/**
	 * Returns a maze path for a random maze
	 */
	private fillMazeRandom() {
		let index: number = -1;
		let output: string = "";

		// tslint:disable-next-line:prefer-const
		let cellsList: Cell[] = [new Cell(this.StartLocation.Z, this.StartLocation.Y, this.StartLocation.X)];

		while (cellsList.length > 0) {
			// index is the newest
			index = cellsList.length - 1;

			const currentCell: Cell = cellsList[index];

			const directions: string[] = this.Utilities.getRandomDirections ();

			for (let i = 0; i < directions.length; i++) {
				const nextCell: Cell = this.directionModifier(cellsList[index], directions[i]);
				if (this.isEmptyCell(nextCell.Z, nextCell.Y, nextCell.X)) {

					// we found a workable direction
					const result: any = this.carvePathBetweenCells (currentCell, nextCell, directions[i]);
					this.MazeGrid[currentCell.Z][currentCell.Y][currentCell.X] = result.current;
					this.MazeGrid[nextCell.Z][nextCell.Y][nextCell.X] = result.next;

					cellsList.push(nextCell);
					output += directions[i];
					index = -1;
					break;
				}
			}
			if (index !== -1) {
				cellsList.splice(index, 1);
				output += this.Utilities.Back;
			}
		}
		return output;
	}

	private carvePathBetweenCells(currentCell: Cell, nextCell: Cell, direction: string) {
		switch (direction) {
			case this.Utilities.North:
				currentCell.North = true;
				nextCell.South = true;
				break;
			case this.Utilities.East:
				currentCell.East = true;
				nextCell.West = true;
				break;
			case this.Utilities.South:
				currentCell.South = true;
				nextCell.North = true;
				break;
			case this.Utilities.West:
				currentCell.West = true;
				nextCell.East = true;
				break;
			case this.Utilities.Up:
				currentCell.Up = true;
				nextCell.Down = true;
				break;
			case this.Utilities.Down:
				currentCell.Down = true;
				nextCell.Up = true;
				break;
		}
		return { current: currentCell, next: nextCell };
	}

	private isEmptyCell(z: number, y: number, x: number) {
		if (z >= 0 && z < this.GridLayers
			&& 	y >= 0 && y < this.GridHeight
			&&  x >= 0 && x < this.GridWidth
			&&  (this.MazeGrid[z][y][x] === null || this.MazeGrid[z][y][x] === undefined))
					return true;
		return false;
	}

	private directionModifier(cell: Cell, direction: string) {
		switch (direction) {
			case this.Utilities.North:
				return new Cell(cell.Z, cell.Y - 1, cell.X);
			case this.Utilities.East:
				return new Cell(cell.Z, cell.Y, cell.X + 1);
			case this.Utilities.South:
				return new Cell(cell.Z, cell.Y + 1, cell.X);
			case this.Utilities.West:
				return new Cell(cell.Z, cell.Y, cell.X - 1);
			case this.Utilities.Up:
				// if we're at the top layer, loop around
				if (cell.Z === this.gridLayers - 1)
					return new Cell(0, cell.Y, cell.X);
				else
					return new Cell(cell.Z + 1, cell.Y, cell.X);
			case this.Utilities.Down:
				// if we're at the bottom layer, loop around
				if (cell.Z === 0)
					return new Cell(this.GridLayers - 1, cell.Y, cell.X);
				else
					return new Cell(cell.Z - 1, cell.Y, cell.X);
		}
		return new Cell(cell.Z, cell.Y, cell.Z);
	}
}
