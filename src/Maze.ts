class Maze {
	public MazeGrid: Cell[][][];
	public EndCell: Cell;

	public readonly North: string = "North";
	public readonly East: string = "East";
	public readonly South: string = "South";
	public readonly West: string = "West";
	public readonly Up: string = "Up";
	public readonly Down: string = "Down";

	private CellsList: Cell[];
	private GridLayers: number;
	private GridWidth: number;
	private GridHeight: number;

	constructor (public gridLayers: number, public gridWidth: number, public gridHeight: number) {
		this.GridLayers	= gridLayers;
		this.GridWidth	= gridWidth;
		this.GridHeight	= gridHeight;

		// generate the grid
		this.MazeGrid = this.generateGrid();

		// create the cells list
		this.CellsList = [new Cell(-1, -1, -1)];

		this.EndCell = new Cell(-1, -1, -1);
	}

	public fillMaze () {
		this.fillMazeRandom();
		// this.fillMazeProcedural();
	}

	protected fillMazeProcedural () {
		// let pro : string = "";

		// this.MazeGrid = $.parseJSON(atob(pro));

	}

	protected encodeMaze () {
		// console.log(btoa(JSON.stringify(this.MazeGrid)));
		console.log((JSON.stringify(this.MazeGrid)));
	}

	protected fillMazeRandom () {
		// initialize the cellsList and add the first cell to the list
		this.CellsList.push(new Cell(
			0,
			this.getRandomIntInclusive (0, this.gridHeight - 1),
			this.getRandomIntInclusive (0, this.gridWidth - 1),
		));

		let index: number = -1;

		while (this.CellsList.length > 0) {
			// index is the newest
			index = this.CellsList.length - 1;

			const currentCell: Cell = this.CellsList[index];

			const directions: string[] = this.getRandomDirections ();

			for (let i = 0; i < directions.length; i++) {
				const nextCell: Cell = this.directionModifier (this.CellsList[index], directions[i]);
				if (this.isEmptyCell(nextCell.Z, nextCell.Y, nextCell.X)) {

					// we found a workable direction
					const result: any = this.getReverseDirection (currentCell, nextCell, directions[i]);
					this.MazeGrid[currentCell.Z][currentCell.Y][currentCell.X] = result.current;
					this.MazeGrid[nextCell.Z][nextCell.Y][nextCell.X] = result.next;

					this.CellsList.push(nextCell);
					index = -1;
					break;
				}
			}
			if (index !== -1)
				this.CellsList.splice(index, 1);
		}
		this.EndCell = this.MazeGrid[0]
							[this.getRandomIntInclusive (1, this.gridHeight - 1)]
							[this.getRandomIntInclusive (1, this.gridWidth - 1)];
		this.encodeMaze();
	}
	protected generateGrid () {
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

	protected getReverseDirection (currentCell: Cell, nextCell: Cell, direction: string) {
		switch (direction) {
			case this.North:
				currentCell.North = true;
				nextCell.South = true;
				break;
			case this.East:
				currentCell.East = true;
				nextCell.West = true;
				break;
			case this.South:
				currentCell.South = true;
				nextCell.North = true;
				break;
			case this.West:
				currentCell.West = true;
				nextCell.East = true;
				break;
			case this.Up:
				currentCell.Up = true;
				nextCell.Down = true;
				break;
			case this.Down:
				currentCell.Down = true;
				nextCell.Up = true;
				break;
		}
		return { current: currentCell, next: nextCell };
	}

	protected getRandomIntInclusive (min: number, max: number) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
		// The maximum is inclusive and the minimum is inclusive
	}

	protected getRandomDirections () {
		return this.shuffle([
			this.North,
			this.South,
			this.West,
			this.East,
			this.Up,
			this.Down,
		]);
	}

	/**
	 * Shuffles array in place.
	 * @param {Array} array items An array containing the items.
	 */
	protected shuffle (array: any) {
		let j;
		let x;
		let i;
		for (i = array.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = array[i];
			array[i] = array[j];
			array[j] = x;
		}
		return array;
	}

	protected isEmptyCell (z: number, y: number, x: number) {
		if (z >= 0 && z < this.GridLayers
			&& 	y >= 0 && y < this.GridHeight
			&&  x >= 0 && x < this.GridWidth
			&&  (this.MazeGrid[z][y][x] === null || this.MazeGrid[z][y][x] === undefined))
					return true;
		return false;
	}

	private directionModifier (cell: Cell, direction: string) {
		switch (direction) {
			case this.North:
				return new Cell(cell.Z, cell.Y - 1, cell.X);
			case this.East:
				return new Cell(cell.Z, cell.Y, cell.X + 1);
			case this.South:
				return new Cell(cell.Z, cell.Y + 1, cell.X);
			case this.West:
				return new Cell(cell.Z, cell.Y, cell.X - 1);
			case this.Up:
				// if we're at the top layer, loop around
				if (cell.Z === this.gridLayers - 1)
					return new Cell(0, cell.Y, cell.X);
				else
					return new Cell(cell.Z + 1, cell.Y, cell.X);
			case this.Down:
				// if we're at the bottom layer, loop around
				if (cell.Z === 0)
					return new Cell(this.GridLayers - 1, cell.Y, cell.X);
				else
					return new Cell(cell.Z - 1, cell.Y, cell.X);
		}
		return new Cell(cell.Z, cell.Y, cell.Z);
	}
}
