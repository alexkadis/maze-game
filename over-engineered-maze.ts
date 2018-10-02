function main() {

	let myMaze = new Maze(1, 5, 5);
	myMaze.fillMaze();
	myMaze.displayMaze();
	console.log("TESTING");
}

class Maze {
	GridLevels: number;
	GridWidth: number;
	GridHeight: number;
	MazeGrid: cell[][][];
	CellsList: cell[];
	WallCell: cell;
	
	north: string;
	east: string;
	south: string;
	west: string;
	up: string;
	down: string;
	
	constructor (public gridLevels : number, public gridWidth : number, public gridHeight : number) {
		this.GridLevels = gridLevels;
		this.GridWidth = gridWidth;
		this.GridHeight = gridHeight;
		
		// generate the grid
		this.MazeGrid = this.generateGrid();
		
		// create the wall cell, any cell that needs a wall references this one
		this.WallCell = this.createCell(-1, -1, -1, true);
		
		// create the cells list
		this.CellsList = [this.WallCell];

		this.north = "North";
		this.east = "East";
		this.south = "South";
		this.west = "West";
		this.up = "Up";
		this.down = "Down";
	}

	generateGrid() {
		let tempGrid : any = new Array(this.GridLevels);
		for(let i = 0; i < this.GridLevels; i++) {
			tempGrid[i] = new Array(this.GridHeight);
			for(let j = 0; j < this.GridHeight; j++) {
				tempGrid[i][j] = new Array(this.GridWidth);
				tempGrid[i][j].fill();
			}
		}
		return tempGrid;
	}

	fillMaze() {
		// console.log("filling maze");

		// initialize the cellsList and add the first cell to the list
		this.CellsList.push(this.createCell(
			0,
			this.getRandomIntInclusive(0,this.gridHeight - 1),
			this.getRandomIntInclusive(0,this.gridWidth - 1)
		));

		let index : number = -1;

		while (this.CellsList.length > 0) {

			// index is the newest
			index = this.CellsList.length - 1;
			
			// random index (something about this fails)
			// let index = this.getRandomIntInclusive(0, this.cellsList.length);
		
			let currentCell : cell = this.CellsList[index];
			// console.log(currentCell);
			let directions : any = this.getRandomDirections();

			for (let i = 0; i < directions.length; i++) {
				let nextCell : cell = this.directionModifier(this.CellsList[index],directions[i])
				if (this.isEmptyCell(nextCell.Z, nextCell.Y, nextCell.X)) {
					// console.log(directions[i]);
					// we found a workable direction
					////// TO DO: THIS IS THE CRITICAL rewrite
					let result : any = this.assignCellDirections(currentCell, nextCell, directions[i]);


					this.MazeGrid[currentCell.Z][currentCell.Y][currentCell.X] = result.current;
					this.MazeGrid[nextCell.Z][nextCell.Y][nextCell.X] = result.next;

					///////
					this.CellsList.push(nextCell);
					index = -1;
					break;	
				} else {
					// we're facing what should be a wall
					// let result : any = this.assignCellDirectionToWall(currentCell, directions[i]);
					// this.MazeGrid[currentCell.Z][currentCell.Y][currentCell.X] = result.current;
				}
			}
			if (index != -1) {
				this.CellsList.splice(index,1);
			}
			
			// this.displayMaze();
			// await this.sleep(500);
		} 
	}

	assignCellDirectionToWall(currentCell : cell, direction : string) {
		return this.assignCellDirections(currentCell, this.WallCell, direction);
	}

	assignCellDirections(currentCell : cell, nextCell : cell, direction : string) {
		switch(direction) {
			case this.north:
				currentCell.North = nextCell;
				nextCell.South = currentCell;
				break;
			case this.east:
				currentCell.East = nextCell;
				nextCell.West = currentCell;
				break;
			case this.south:
				currentCell.South = nextCell;
				nextCell.North = currentCell;
				break;
			case this.west:
				currentCell.West = nextCell;
				nextCell.East = currentCell;
				break;
			case this.up:
				currentCell.Up = nextCell;
				nextCell.Down = currentCell;
				break;
			case this.down:
				currentCell.Down = nextCell;
				nextCell.Up = currentCell;
				break;
		}
		return { current: currentCell, next: nextCell };
	}

	createCell(z : number, y : number, x : number, isWall : boolean = false) {
		let tempCell : cell = new cell();
		tempCell.Z = z;
		tempCell.Y = y;
		tempCell.X = x;
		tempCell.isWall = isWall;
		return tempCell;
	}

	getRandomIntInclusive(min: number, max: number) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
	}
	
	getRandomDirections() {
		return this.shuffle([
			this.north,
			this.south,
			this.west,
			this.east
			// this.up,
			// this.down
		]);
	}

	isEmptyCell(z : number, y : number, x : number) {
		console.log(z, y, x);
		if (z >= 0 && z < this.gridLevels 
			&& 	y >= 0 && y < this.gridHeight 
			&&  x >= 0 && x < this.gridWidth) {
				if (this.MazeGrid[z][y][x] === null || this.MazeGrid[z][y][x] === undefined) {
					return true;
				} else {
					// return !this.MazeGrid[z][y][x].isWall;
				}
				
			} 
		return false;
	}

	directionModifier(cell : cell, direction : string) {
		switch (direction) {
			case this.north:
				return this.createCell(cell.Z, cell.Y - 1, cell.X);
			case this.east:
				return this.createCell(cell.Z, cell.Y, cell.X + 1);
			case this.south:
				return this.createCell(cell.Z, cell.Y + 1, cell.X);
			case this.west:
				return this.createCell(cell.Z, cell.Y, cell.X - 1);
			case this.up:
				// if we're at the top level, loop around
				if (cell.Z == this.gridLevels - 1) {
					return this.createCell(0, cell.Y, cell.X);
				} else {
					return this.createCell(cell.Z + 1, cell.Y, cell.X);
				}
			case this.down:
				// if we're at the bottom level, loop around
				if (cell.Z == 0) {
					return this.createCell(this.GridLevels - 1, cell.Y, cell.X);
				} else {
					return this.createCell(cell.Z - 1, cell.Y, cell.X);
				}
		}
		return this.createCell(cell.Z, cell.Y, cell.Z); 
	}

	shuffle(array : any) {
		let currentIndex : any = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}

	getClassesFromCell(cell : cell) {
		let classes : string = "";

		if (cell.North == this.WallCell.South)
			classes += " top ";
		if (cell.East == this.WallCell.West)
			classes += " right ";
		if (cell.South == this.WallCell.North)
			classes += " bottom ";
		if (cell.West == this.WallCell.East)
			classes += " left ";
		return classes;

	}


	displayMaze () {
		let html : string = "";

		console.log(this.MazeGrid);
		
		for (let level = 0; level < this.MazeGrid.length; level++) {
			html += '<div id="level-' + level + '"><h3>Level #' + level + '</h3>\n';

			for (let row = 0; row < this.MazeGrid[level].length; row++) {
				html += "<div class='r'>";

				for(let column = 0; column < this.gridWidth; column++) {
					let classes : string = this.getClassesFromCell(this.MazeGrid[level][row][column]);
					html += `<div class="b ${classes}">&nbsp;`;
					html += "</div>";

				}
				html += "</div> <!-- end row -->\n"; 
			}
		}
		$("#maze-game").html(html);


		console.log(this.MazeGrid[0]);
	}
}


class cell {
	North: cell | null;
	East: cell | null;
	South: cell | null;
	West: cell | null;
	Up: cell | null;
	Down: cell | null;
	Z: number;
	Y: number;
	X: number;
	isWall : boolean;

	constructor() {
		this.North = null;
		this.East = null;
		this.South = null;
		this.West = null;
		this.Up = null;
		this.Down = null;
		this.Z = -1;
		this.Y = -1;
		this.X = -1;
		this.isWall = false;
	}
}





/* 
Cells:
- north
- south
- east
- west
- up
- down
- z
- x
- y

Algorithm:
cells have all directions (north, east, south, west, up, down) which refer to different cells or "wall" 
- Edges are `wall`
When you loop:
If it's an empty cell, instead of cardinal direction, it'll be a cell reference
1. new cell's relative direction refers to this cell
2. this cell's relative direction refers to the new cell
If it's not an empty cell, the direction will be `wall`

Display:
1. Loop through the grid (z, y, x)
2. If a direction is a wall, set that border wall (top border, east border, south border, west border)
So it displays bottom to top, left to right, can't display as it grows?



*/
