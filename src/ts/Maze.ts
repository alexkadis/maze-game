class Maze {
	// End location isn't a cell... because it doesn't have walls
	public StartLocation: any;
	public EndLocation: any;

	public GridLayers: number;
	public GridWidth: number;
	public GridHeight: number;
	public MazeGrid: Cell[][][];

	// public Maze: any;
	public MazePath: string;
	public MazePathCompressed: string;
	private IsMazeSolved: boolean = false;
	// private PathTemplate: string[] = [];
	private Utilities = new Utils();

	constructor(public gridLayers: number, public gridWidth: number, public gridHeight: number, public mazePathCompressed?: string) {
		this.GridLayers	= gridLayers;
		this.GridWidth	= gridWidth;
		this.GridHeight	= gridHeight;

		// generate the grid
		this.MazeGrid = this.generateGrid();

		// create the cells list

		if (mazePathCompressed !== undefined) {
			// Procedural generated path
			this.MazePathCompressed = mazePathCompressed;
			this.MazePath = this.fillMazeProcedural(LZString.decompressFromEncodedURIComponent(this.MazePathCompressed));
		} else {
			// Random generated path
			this.MazePath = this.fillMazeRandom();
			this.EndLocation = {
				Z: 0,
				Y: this.Utilities.getRandomIntInclusive(1, this.GridHeight - 1),
				X: this.Utilities.getRandomIntInclusive(1, this.GridWidth - 1)};
			this.MazePathCompressed = LZString.compressToEncodedURIComponent(this.MazePath) + "|" + JSON.stringify(this.EndLocation);
		}
	}

	public generateGrid() {
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

	protected fillMazeProcedural(decompressedPath: string) {
		const res: any = this.Utilities.getLocationsFromTemplate(decompressedPath);
		this.EndLocation = res.End;
		let next = res.Path;

		let index: number = -1;
		// tslint:disable-next-line:prefer-const
		let cellsList: Cell[] = [new Cell(0, 0, 0)];

		while (cellsList.length > 0) {
			// index is the newest
			index = cellsList.length - 1;

			const currentCell: Cell = cellsList[index];

			next = this.Utilities.getNextActionFromTemplate(next);

			if (next === this.Utilities.Back) {
				cellsList.splice(index, 1);
			} else if (next === "") {
				break;
			} else {
				const nextCell: Cell = this.directionModifier(cellsList[index], next);
				const result: any = this.carvePathBetweenCells(currentCell, nextCell, next);

				this.MazeGrid[currentCell.Z][currentCell.Y][currentCell.X] = result.current;
				this.MazeGrid[nextCell.Z][nextCell.Y][nextCell.X] = result.next;
				cellsList.push(nextCell);
				index = -1;
			}
			if (index !== -1) {
				cellsList.splice(index, 1);
			}
		}
		return next;
	}

	protected fillMazeRandom() {
		let index: number = -1;
		let output: string = "";

		// tslint:disable-next-line:prefer-const
		let cellsList: Cell[] = [new Cell(0, 0, 0)];

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

	protected carvePathBetweenCells(currentCell: Cell, nextCell: Cell, direction: string) {
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

	protected isEmptyCell(z: number, y: number, x: number) {
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
