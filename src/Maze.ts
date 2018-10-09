class Maze {
	public MazeGrid: Cell[][][];
	private CellsList: Cell[];
	private WallCell: Cell;

	private GridLayers: number;
	private GridWidth: number;
	private GridHeight: number;

	private North: string;
	private East: string;
	private South: string;
	private West: string;
	private Up: string;
	private Down: string;

	constructor (public gridLayers: number, public gridWidth: number, public gridHeight: number) {
		this.GridLayers	= gridLayers;
		this.GridWidth	= gridWidth;
		this.GridHeight	= gridHeight;

		// generate the grid
		this.MazeGrid = this.generateGrid();

		// create the wall cell, any cell that needs a wall references this one
		this.WallCell = this.createCell(-1, -1, -1, true);

		// create the cells list
		this.CellsList = [this.WallCell];

		this.North	= "North";
		this.East	= "East";
		this.South	= "South";
		this.West	= "West";
		this.Up		= "Up";
		this.Down	= "Down";
	}

	public fillMaze () {
		// initialize the cellsList and add the first cell to the list
		this.CellsList.push ( this.createCell (
			0,
			this.getRandomIntInclusive(0, this.gridHeight - 1),
			this.getRandomIntInclusive(0, this.gridWidth - 1),
		));

		let index: number = -1;

		while (this.CellsList.length > 0) {
			// index is the newest
			index = this.CellsList.length - 1;

			// random index (something about this fails)
			// let index = this.getRandomIntInclusive(0, this.cellsList.length);

			const currentCell: Cell = this.CellsList[index];
			// console.log(currentCell);
			const directions: string[] = this.getRandomDirections();

			for (let i = 0; i < directions.length; i++) {
				const nextCell: Cell = this.directionModifier(this.CellsList[index], directions[i]);
				if (this.isEmptyCell(nextCell.Z, nextCell.Y, nextCell.X)) {
					// console.log(directions[i]);
					// we found a workable direction

					const result: any = this.assignCellDirections(currentCell, nextCell, directions[i]);
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
	}

	public displayMaze() {
		let html: string = "";

		for (let layer = 0; layer < this.MazeGrid.length; layer++) {
			const layerName: string = this.getNameFromLayer(layer);

			html += `<div id="layer${layer}" class="${layerName}">`;
			html += `<h3>Layer ${layerName}</h3>`;
			html += `<table id="layer${layer}-table class="${layerName}">`;

			for (let row = 0; row < this.MazeGrid[layer].length; row++) {
				html += "<tr class='r'>";

				for (let column = 0; column < this.gridWidth; column++) {
					const classes: string = this.getClassesFromCell(this.MazeGrid[layer][row][column]);
					html += `<td class="cell ${classes} ${layerName} y${row}x${column}">&nbsp;`;
					html += "</td>";
				}
				html += "</tr> <!-- end row -->\n";
			}
			html += "</table>";
			html += "</div>";
		}
		$("#maze-game").html(html);

		console.log(this.MazeGrid[0]);
	}
	
	private generateGrid () {
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

	private assignCellDirections (currentCell: Cell, nextCell: Cell, direction: string) {
		switch (direction) {
			case this.North:
				currentCell.North = nextCell;
				nextCell.South = currentCell;
				break;
			case this.East:
				currentCell.East = nextCell;
				nextCell.West = currentCell;
				break;
			case this.South:
				currentCell.South = nextCell;
				nextCell.North = currentCell;
				break;
			case this.West:
				currentCell.West = nextCell;
				nextCell.East = currentCell;
				break;
			case this.Up:
				currentCell.Up = nextCell;
				nextCell.Down = currentCell;
				break;
			case this.Down:
				currentCell.Down = nextCell;
				nextCell.Up = currentCell;
				break;
		}
		return { current: currentCell, next: nextCell };
	}

	private createCell (z: number, y: number, x: number, isWall: boolean = false) {
		const tempCell: Cell = new Cell();
		tempCell.Z = z;
		tempCell.Y = y;
		tempCell.X = x;
		tempCell.isWall = isWall;
		return tempCell;
	}

	private getRandomIntInclusive (min: number, max: number) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
		// The maximum is inclusive and the minimum is inclusive
	}

	private getRandomDirections () {
		return this.shuffle([
			this.North,
			this.South,
			this.West,
			this.East,
			this.Up,
			this.Down,
		]);
	}

	private isEmptyCell (z: number, y: number, x: number) {
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
				return this.createCell(cell.Z, cell.Y - 1, cell.X);
			case this.East:
				return this.createCell(cell.Z, cell.Y, cell.X + 1);
			case this.South:
				return this.createCell(cell.Z, cell.Y + 1, cell.X);
			case this.West:
				return this.createCell(cell.Z, cell.Y, cell.X - 1);
			case this.Up:
				// if we're at the top layer, loop around
				if (cell.Z === this.gridLayers - 1)
					return this.createCell(0, cell.Y, cell.X);
				else
					return this.createCell(cell.Z + 1, cell.Y, cell.X);
			case this.Down:
				// if we're at the bottom layer, loop around
				if (cell.Z === 0)
					return this.createCell(this.GridLayers - 1, cell.Y, cell.X);
				else
					return this.createCell(cell.Z - 1, cell.Y, cell.X);
		}
		return this.createCell(cell.Z, cell.Y, cell.Z);
	}
	/**
	 * Shuffles array in place.
	 * @param {Array} array items An array containing the items.
	 */
	shuffle(array : any) {
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
	// private shuffle (array: any) {
	// 	let currentIndex: any = array.length, temporaryValue, randomIndex;

	// 	// While there remain elements to shuffle...
	// 	while (0 !== currentIndex) {
	// 		// Pick a remaining element...
	// 		randomIndex = Math.floor(Math.random() * currentIndex);
	// 		currentIndex -= 1;

	// 		// And swap it with the current element.
	// 		temporaryValue = array[currentIndex];
	// 		array[currentIndex] = array[randomIndex];
	// 		array[randomIndex] = temporaryValue;
	// 	}
	// 	return array;
	// }

	private getClassesFromCell (cell: Cell) {

		let classes: string = "";

		if (cell.North === this.WallCell.South)
			classes += " top ";
		if (cell.East === this.WallCell.West)
			classes += " right ";
		if (cell.South === this.WallCell.North)
			classes += " bottom ";
		if (cell.West === this.WallCell.East)
			classes += " left ";
		if (cell.Up !== this.WallCell.Down)
			classes += " up ";
		if (cell.Down !== this.WallCell.Up)
			classes += " down ";

		return classes;
	}

	private getNameFromLayer (layer: number) {
		switch (layer) {
			case 0:
				return "winter";
			case 1:
				return "spring";
			case 2:
				return "summer";
			case 3:
				return "fall";
			default:
				return "";
		}
	}
}
