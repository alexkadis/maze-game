var currentLayer : number;
var availableLayers : number;

function main() {
	currentLayer = 0;
	availableLayers = Number($("#layers").find(":selected").val());

	let myMaze = new Maze(availableLayers, 5, 5);
	myMaze.fillMaze();
	myMaze.displayMaze();
	showLayerHideOthers(currentLayer);
}

function showLayerHideOthers(layerChoice : number) {
	if (availableLayers > 1) {
		for(let layer = 0; layer < availableLayers; layer++) {
			let layerId :string = `#layer${layer}`;
			if (layer == layerChoice) {
				$(layerId).show();
			} else {
				$(layerId).hide();
			}
		}
	}
}

function goUp() {
	if(currentLayer < availableLayers - 1) {
		currentLayer++;
	} else {
		currentLayer = 0;
	}
	showLayerHideOthers(currentLayer);
}
function goDown() {
	if(currentLayer == 0) {
		currentLayer = availableLayers - 1;
	} else {
		
	}
	showLayerHideOthers(currentLayer);
}

class Maze {
	GridLayers: number;
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

		this.north	= "North";
		this.east	= "East";
		this.south	= "South";
		this.west	= "West";
		this.up		= "Up";
		this.down	= "Down";
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
		
			let currentCell : cell = this.CellsList[index];
			// console.log(currentCell);
			let directions : string[] = this.getRandomDirections();

			for (let i = 0; i < directions.length; i++) {
				let nextCell : cell = this.directionModifier(this.CellsList[index],directions[i])
				if (this.isEmptyCell(nextCell.Z, nextCell.Y, nextCell.X)) {
					// console.log(directions[i]);
					// we found a workable direction
					
					let result : any = this.assignCellDirections(currentCell, nextCell, directions[i]);
					this.MazeGrid[currentCell.Z][currentCell.Y][currentCell.X] = result.current;
					this.MazeGrid[nextCell.Z][nextCell.Y][nextCell.X] = result.next;

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
		return Math.floor(Math.random() * (max - min + 1)) + min;
		// The maximum is inclusive and the minimum is inclusive 
	}
	
	getRandomDirections() {
		return this.shuffle([
			this.north,
			this.south,
			this.west,
			this.east,
			this.up,
			this.down
		]);
	}

	isEmptyCell(z : number, y : number, x : number) {
		if (z >= 0 && z < this.gridLayers 
			&& 	y >= 0 && y < this.gridHeight 
			&&  x >= 0 && x < this.gridWidth) {
				if (this.MazeGrid[z][y][x] === null || this.MazeGrid[z][y][x] === undefined)
					return true;
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
				// if we're at the top layer, loop around
				if (cell.Z == this.gridLayers - 1)
					return this.createCell(0, cell.Y, cell.X);
				else
					return this.createCell(cell.Z + 1, cell.Y, cell.X);
			case this.down:
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
			html += `<h3>Layer # ${layer}</h3>`;
			html += `<table id="layer${layer}-table class="${layerName}">`;

			for (let row = 0; row < this.MazeGrid[layer].length; row++) {
				html += "<tr class='r'>";

				for(let column = 0; column < this.gridWidth; column++) {
					let classes : string = this.getClassesFromCell(this.MazeGrid[layer][row][column]);
					html += `<td class="b ${classes} ${layerName}">&nbsp;`;
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