class Maze {
	public MazeGrid: Cell[][][];

	// End location isn't a cell... because it doesn't have walls
	public EndLocation: any;
	// public Maze: any;

	public readonly North: string = "N";
	public readonly East: string = "E";
	public readonly South: string = "S";
	public readonly West: string = "W";
	public readonly Up: string = "U";
	public readonly Down: string = "D";
	public readonly Directions: string[] = [
		this.North,
		this.South,
		this.West,
		this.East,
		this.Up,
		this.Down,
	];
	public readonly Back: string = "B";


	public MazePath: string;
	public MazePathCompressed: string;

	private CellsList: Cell[];
	private GridLayers: number;
	private GridWidth: number;
	private GridHeight: number;

	constructor (public gridLayers: number, public gridWidth: number, public gridHeight: number, public mazePathCompressed?: string) {
		this.GridLayers	= gridLayers;
		this.GridWidth	= gridWidth;
		this.GridHeight	= gridHeight;

		// generate the grid
		this.MazeGrid = this.generateGrid();

		// create the cells list
		this.CellsList = [new Cell(0, 0, 0)];


		if (mazePathCompressed !== undefined && typeof mazePathCompressed !== undefined &&  mazePathCompressed !== "") {
			// it's procedural
			this.fillMazeProcedural();
			this.MazePathCompressed = mazePathCompressed;
			let uncompressed =  LZString.decompressFromEncodedURIComponent(mazePathCompressed);
			if (uncompressed !== undefined && uncompressed !== null) {
				this.MazePath = uncompressed;
			} else {
				this.MazePath = "";
			}

		} else {
			// It's random
			this.MazePath = "";
			this.fillMazeRandom();
			
			this.EndLocation = 
				{Z: 0,
				Y: this.getRandomIntInclusive(1, this.gridHeight - 1), 
				X: this.getRandomIntInclusive(1, this.gridWidth - 1)};
			this.MazePath += "|" + JSON.stringify(this.EndLocation);

			this.MazePathCompressed = LZString.compressToEncodedURIComponent(this.MazePath);
		}
	}
	protected getEndLocation(str: string) {
		console.log (JSON.parse(str.split('|')[1]));
	}
	protected fillMazeProcedural () {
		// let pro : string = "";
		// OoVQoiDKkskCIDllWMZ6zzNEiR7ZI4H4SxpyXHzDzZZhZ1qSiTngTR3S1x4w+dNjzgkibACEpoGYhlT+kjkJwkmCaFnxQ8kpBLT1mUkjGS6oUhYrizJwKZEWu373ALjM4Jy7MNWeARvCEkIIWMbND0lbXBYMwUmWgYDGCd3LOybBXg3Lhyi10QwYvLFFwrqmtqaqrrGpuKAbSF4AC4AbwAiAC0ejoAGABoegE1BgHYxgA1BgFYAXwBdIA
		let decompressed = LZString.decompressFromEncodedURIComponent(this.MazePathCompressed);
		if (decompressed !== undefined && typeof decompressed !== undefined &&  decompressed !== null) {
			this.MazePath = decompressed;
		}
		this.getEndLocation(this.MazePath);
		// let templateList = 
		// let index: number = -1;

		// while (this.CellsList.length > 0) {
		// 	// index is the newest
		// 	index = this.CellsList.length - 1;

		// 	const currentCell: Cell = this.CellsList[index];

		// 	const directions: string[] = this.getRandomDirections ();

		// 	for (let i = 0; i < directions.length; i++) {
		// 		const nextCell: Cell = this.directionModifier (this.CellsList[index], directions[i]);
		// 		if (this.isEmptyCell(nextCell.Z, nextCell.Y, nextCell.X)) {

		// 			// we found a workable direction
		// 			const result: any = this.carvePathBetweenCells (currentCell, nextCell, directions[i]);
		// 			this.MazeGrid[currentCell.Z][currentCell.Y][currentCell.X] = result.current;
		// 			this.MazeGrid[nextCell.Z][nextCell.Y][nextCell.X] = result.next;

		// 			this.CellsList.push(nextCell);
		// 			this.encodeMaze(directions[i]);
		// 			index = -1;
		// 			break;
		// 		}
		// 	}
		// 	if (index !== -1) {
		// 		this.CellsList.splice(index, 1);
		// 		this.encodeMaze(this.Back);
		// 	}
		// }

	}

	protected encodeMaze (direction: string) {

		this.MazePath += direction;

		// console.log(this.groupBy(this.MazeGrid[0][1], this.North));

		// console.log(this.MazeGrid.reduce(function(allCells, currentCell){
			
		// 	if(typeof currentCell === 'object' && currentCell instanceof Cell)
		// 		console.log("IS CELL");
		// 	else
		// 		console.log("no");
		// 	return allCells;
		// }))
		//JSON.stringify(this.MazeGrid); //, this.simplifyMazeGrid);
		// console.log(JSON.stringify(this.MazeGrid, this.simplifyMazeGrid));
		// console.log((JSON.stringify(this.MazeGrid)));
	}


	// groupBy(objectArray: any, property: any) {
	// 	return objectArray.reduce(function (acc: any, obj: any) {
	// 		var key = obj[property];
	// 		if (!acc[key]) {
	// 			acc[key] = [];
	// 		}
	// 		// if (!acc[key] || acc[key] == false) {
	// 		// 	acc[key] = [];
	// 		// } else {
	// 		// 	acc[key].push(obj);
	// 		// }
	// 		acc[key].push(obj);
	// 		return acc;
	// 	}, {});
	// }
	  
	// protected simplifyMazeGrid (key: any, value: any) {
	// 	// Filtering out properties
	// 	if (typeof value === 'string') {
	// 		return undefined;
	// 	} else if(value !== undefined && typeof value === 'object' && value instanceof Cell) {
	// 		let newCell: string[]; 

			
	// 		console.log(this.Directions);
			
	// 		// this.Directions.forEach(function(direction) {
	// 			// console.log(value[direction]);
	// 		// });

			

	// 	}
	// 	return value;
		
	// 	// for (let z: number = 0; z < this.MazeGrid.length; z++) {
	// 	// 	for (let y: number = 0; y < this.MazeGrid[0].length; y++) {
	// 	// 		for (let x: number = 0; x < this.MazeGrid[0][0].length; x++) {
	// 	// 			const currentCell = this.MazeGrid[z][y][x];



					
	// 	// 		}
	// 	// 	}
	// 	// }

	// }



	protected fillMazeRandom () {
		// Add the first cell to the list
		// this.CellsList.push(new Cell(
		// 	0,
		// 	this.getRandomIntInclusive (0, this.gridHeight - 1),
		// 	this.getRandomIntInclusive (0, this.gridWidth - 1),
		// ));

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
					const result: any = this.carvePathBetweenCells (currentCell, nextCell, directions[i]);
					this.MazeGrid[currentCell.Z][currentCell.Y][currentCell.X] = result.current;
					this.MazeGrid[nextCell.Z][nextCell.Y][nextCell.X] = result.next;

					this.CellsList.push(nextCell);
					this.encodeMaze(directions[i]);
					index = -1;
					break;
				}
			}
			if (index !== -1) {
				this.CellsList.splice(index, 1);
				this.encodeMaze(this.Back);
			}
		}
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

	protected carvePathBetweenCells (currentCell: Cell, nextCell: Cell, direction: string) {
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
		return this.shuffle(this.Directions);
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
