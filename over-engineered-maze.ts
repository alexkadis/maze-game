var currentLayer : number;
var GridLayers : number;
var GridHeight : number;
var GridWidth : number;
var MyCharacter : Character;

function main() {
	currentLayer = 0;
	GridLayers = 4;
	GridHeight = 5;
	GridWidth = 5;

	let myMaze = new Maze(GridLayers, GridHeight, GridWidth);
	myMaze.fillMaze();
	myMaze.displayMaze();
	showLayerHideOthers(currentLayer);

	MyCharacter = new Character("pinkdude", "pink", myMaze.MazeGrid[0][0][0], myMaze.MazeGrid);
}

function showLayerHideOthers(layerChoice : number) {
	if (GridLayers > 1) {
		for(let layer = 0; layer < GridLayers; layer++) {
			let layerId :string = `#layer${layer}`;
			if (layer == layerChoice) {
				$(layerId).show();
			} else {
				$(layerId).hide();
			}
		}
	}
}

function goNorth() {
	MyCharacter.move(MyCharacter.North);
	console.log(MyCharacter.CurrentLocation);
}
function goEast() {
	MyCharacter.move(MyCharacter.East);
	console.log(MyCharacter.CurrentLocation);
}
function goSouth() {
	MyCharacter.move(MyCharacter.South);
	console.log(MyCharacter.CurrentLocation);
}
function goWest() {
	MyCharacter.move(MyCharacter.West);
	console.log(MyCharacter.CurrentLocation);
}



function goUp() {
	if(currentLayer < GridLayers - 1) {
		currentLayer++;
	} else {
		currentLayer = 0;
	}
	showLayerHideOthers(currentLayer);
	MyCharacter.move(MyCharacter.Up);
	console.log(MyCharacter.CurrentLocation);
}

function goDown() {
	if(currentLayer == 0) {
		currentLayer = GridLayers - 1;
	} else {
		currentLayer--;
	}
	showLayerHideOthers(currentLayer);
	MyCharacter.move(MyCharacter.Down);
	console.log(MyCharacter.CurrentLocation);
}


class Cell {
	North: Cell | null;
	East: Cell | null;
	South: Cell | null;
	West: Cell | null;
	Up: Cell | null;
	Down: Cell | null;
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
	assignCellToNewLocation(newZ : number, newY : number, newX : number) {
		this.Z = newZ;
		this.Y = newY;
		this.X = newX;
		
	}
}


/*
Figure out a way to have a "character" that can move North, South, East, West
	- The character starts at the starting point
	- Character ends at the ending point
	- Character can't move past a wall
*/
class Character {
	Color: string;
	Name: string;

	// location
	CurrentLocation : Cell;

	North: string;
	East: string;
	South: string;
	West: string;
	Up: string;
	Down: string;

	GridLayers : number;
	MazeGrid : Cell[][][];

	constructor(name: string, color: string, startingLocation: Cell, mazeGrid: Cell[][][] ) {
		
		this.Color = color;
		this.Name = name;
		this.CurrentLocation = startingLocation;

		this.North	= "North";
		this.East	= "East";
		this.South	= "South";
		this.West	= "West";
		this.Up		= "Up";
		this.Down	= "Down";

		this.MazeGrid = mazeGrid;
		this.GridLayers = this.MazeGrid.length;

		$(`.y${this.CurrentLocation.Y}x${this.CurrentLocation.X}`).addClass(this.Name);
	}

	move (direction : string) {
		$(`.y${this.CurrentLocation.Y}x${this.CurrentLocation.X}`).removeClass(this.Name);
		console.log(`OLD Location: Z:${this.CurrentLocation.Z} y:${this.CurrentLocation.Y} x:${this.CurrentLocation.X}`);
		switch (direction) {
			case this.North:
				if (this.CurrentLocation.North != null)
					this.CurrentLocation = this.CurrentLocation.North;
				break;
			case this.East:
				if (this.CurrentLocation.East != null)
					this.CurrentLocation = this.CurrentLocation.East;
				break;
			case this.South:
				if (this.CurrentLocation.South != null)
					this.CurrentLocation = this.CurrentLocation.South;
				break;
			case this.West:
				if (this.CurrentLocation.West != null)
					this.CurrentLocation = this.CurrentLocation.West;
				break;
			case this.Up:
				if (this.CurrentLocation.Z == this.GridLayers - 1)
					this.CurrentLocation = this.MazeGrid[0][this.CurrentLocation.Y][this.CurrentLocation.X];
				else
					this.CurrentLocation = this.MazeGrid[this.CurrentLocation.Z + 1][this.CurrentLocation.Y][this.CurrentLocation.X];
				break;
			case this.Down:
				if (this.CurrentLocation.Z == 0)
					this.CurrentLocation = this.MazeGrid[this.GridLayers][this.CurrentLocation.Y][this.CurrentLocation.X];
				else
					this.CurrentLocation = this.MazeGrid[this.CurrentLocation.Z - 1][this.CurrentLocation.Y][this.CurrentLocation.X];
				break;
			default:
				console.log(`Invalid attempt to move from ${this.CurrentLocation} ${direction}`);
				break;
		}
		console.log(`New Location: Z:${this.CurrentLocation.Z} y:${this.CurrentLocation.Y} x:${this.CurrentLocation.X}`);
		$(`.y${this.CurrentLocation.Y}x${this.CurrentLocation.X}`).addClass(this.Name);
	}
}


class Maze {
	GridLayers: number;
	GridWidth: number;
	GridHeight: number;

	MazeGrid: Cell[][][];
	CellsList: Cell[];
	WallCell: Cell;
	
	North: string;
	East: string;
	South: string;
	West: string;
	Up: string;
	Down: string;
	
	constructor (public gridLayers : number, public gridWidth : number, public gridHeight : number) {
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

	generateGrid() {
		let tempGrid : any[] = new Array(this.GridLayers);
		for(let i = 0; i < this.GridLayers; i++) {
			tempGrid[i] = new Array(this.GridHeight);
			for(let j = 0; j < this.GridHeight; j++) {
				tempGrid[i][j] = new Array(this.GridWidth);
				tempGrid[i][j].fill();
			}
		}
		return tempGrid;
	}

	fillMaze() {
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
		
			let currentCell : Cell = this.CellsList[index];
			// console.log(currentCell);
			let directions : string[] = this.getRandomDirections();

			for (let i = 0; i < directions.length; i++) {
				let nextCell : Cell = this.directionModifier(this.CellsList[index],directions[i])
				if (this.isEmptyCell(nextCell.Z, nextCell.Y, nextCell.X)) {
					// console.log(directions[i]);
					// we found a workable direction
					
					let result : any = this.assignCellDirections(currentCell, nextCell, directions[i]);
					this.MazeGrid[currentCell.Z][currentCell.Y][currentCell.X] = result.current;
					this.MazeGrid[nextCell.Z][nextCell.Y][nextCell.X] = result.next;

					this.CellsList.push(nextCell);
					index = -1;
					break;
				}
			}
			if (index != -1) {
				this.CellsList.splice(index,1);
			}
		} 
	}

	assignCellDirections(currentCell : Cell, nextCell : Cell, direction : string) {
		switch(direction) {
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

	createCell(z : number, y : number, x : number, isWall : boolean = false) {
		let tempCell : Cell = new Cell();
		tempCell.Z = z;
		tempCell.Y = y;
		tempCell.X = x;
		tempCell.isWall = isWall;
		return tempCell;
	}

	getRandomIntInclusive(min: number, max: number) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
		// The maximum is inclusive and the minimum is inclusive 
	}
	
	getRandomDirections() {
		return this.shuffle([
			this.North,
			this.South,
			this.West,
			this.East,
			this.Up,
			this.Down
		]);
	}

	isEmptyCell(z : number, y : number, x : number) {
		if (z >= 0 && z < this.GridLayers 
			&& 	y >= 0 && y < this.GridHeight 
			&&  x >= 0 && x < this.GridWidth
			&&  (this.MazeGrid[z][y][x] === null || this.MazeGrid[z][y][x] === undefined))
					return true;
		return false;
	}

	directionModifier(cell : Cell, direction : string) {
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
				if (cell.Z == this.gridLayers - 1)
					return this.createCell(0, cell.Y, cell.X);
				else
					return this.createCell(cell.Z + 1, cell.Y, cell.X);
			case this.Down:
				// if we're at the bottom layer, loop around
				if (cell.Z == 0)
					return this.createCell(this.GridLayers - 1, cell.Y, cell.X);
				else
					return this.createCell(cell.Z - 1, cell.Y, cell.X);
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

	getClassesFromCell(cell : Cell) {
		
		let classes : string = "";

		if (cell.North == this.WallCell.South)
			classes += " top ";
		if (cell.East == this.WallCell.West)
			classes += " right ";
		if (cell.South == this.WallCell.North)
			classes += " bottom ";
		if (cell.West == this.WallCell.East)
			classes += " left ";
		if (cell.Up != this.WallCell.Down)
			classes += " up ";
		if (cell.Down != this.WallCell.Up)
			classes += " down ";
	
		return classes;
	}

	getNameFromLayer(layer : number) {
		switch(layer) {
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

	displayMaze () {
		let html : string = "";
		
		for (let layer = 0; layer < this.MazeGrid.length; layer++) {
			let layerName : string = this.getNameFromLayer(layer);

			html += `<div id="layer${layer}" class="${layerName}">`;
			html += `<h3>Layer ${layerName}</h3>`;
			html += `<table id="layer${layer}-table class="${layerName}">`;

			for (let row = 0; row < this.MazeGrid[layer].length; row++) {
				html += "<tr class='r'>";

				for(let column = 0; column < this.gridWidth; column++) {
					let classes : string = this.getClassesFromCell(this.MazeGrid[layer][row][column]);
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
}