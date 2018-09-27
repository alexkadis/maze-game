"use strict";

function main() {
	var myMaze = new Maze(10,10,2);
}

class Maze {
	constructor(gridHeight, gridWidth, gridLevels) {

		// Builds the grid initially all empty
		console.log("building grid");

		this.gridHeight = gridHeight;
		this.gridWidth = gridWidth;
		this.gridLevels = gridLevels;
		

		// cells
		this.emptyCell = "empty";
		this.pathCell  = "path";
		this.abovePassthroughCell = "passthrough_above";
		this.belowPassthroughCell = "passthrough_below";
		this.verticalPassthroughCell = "passthrough_vertical";
		this.wallCell = "wall";
		this.tempWallCell = "temporary_wall";
		this.startCell = "start";
		this.finishCell = "finish";

		this.cellsList = [];

		// Directions
		this.north = "North";
		this.south = "South";
		this.east  = "East";
		this.west  = "West";
		this.up    = "Up";
		this.down  = "Down";
	 	
	 	var tempGrid = new Array(gridLevels);
		for(let i = 0; i < gridLevels; i++) {
			tempGrid[i] = new Array(gridHeight);
			for(let j = 0; j < gridHeight; j++) {
				tempGrid[i][j] = new Array(gridWidth);
				tempGrid[i][j].fill(this.emptyCell);
			}
		}

		this.mazeGrid = tempGrid;


		// set the starting point
		this.cellsList = [{ 
					"z": 0,
					"y": 0,
					"x": this.getRandomIntInclusive(0,this.gridWidth - 1)
		}];

		// console.log(this.cellsList);
		// this.cellsList.push({ "z": 0, "y": 1, "x": 1});
		this.fillMaze();

		// Builds the maze
		//console.log(this.cellsList);
		this.displayMaze();

	}
	getRandomIntInclusive(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
	}

	// carve the path
	fillMaze(cellNumber = this.cellsList.length - 1) {
		// while(this.cellsList.length > 0) {


		// }
		//console.log("cell: " + cellNumber);
		// console.log(this.cellsList[cellNumber]["z"]);
		

		if(typeof this.cellsList[cellNumber] !== "undefined") {
			// see if the current cell is filled

			var currentCell = {"z": this.cellsList[cellNumber]["z"],
							"y": this.cellsList[cellNumber]["y"],
							"x": this.cellsList[cellNumber]["x"]};
			
			if (this.isEmptyCell(currentCell)) {
				console.log("current added");
			}

			// Go in a random direction
			var directions = this.getRandomDirections();
			
			for (var i = 0; i < directions.length - 1; i++) {

				if(this.isEmptyCell(currentCell, directions[i])) {
					console.log ("direction added: " + directions[i]);
					break;
				} else {
					console.log("not used: " + directions[i]);
				}
			}
			console.log(this.cellsList[cellNumber + 1]);
			if (this.fillMaze(this.cellsList[cellNumber + 1])) {
				console.log("going to next");
			}
			return true;
			// var newCell = this.traverseGrid(currentCell, directions[i]);
			// if (newCell["z"] != -1 ) {
			// 	this.cellsList.push(newCell);
			// 	this.addCellToGrid(this.cellsList.length - 1);
			// 	this.fillMaze(cellNumber);
			// 	console.log("direction added");
			// } else { //if (cellNumber != -1) {
			// 	// backtrace
			// 	this.fillMaze(cellNumber + 1);
			// }

			//this.cellsList.pop();
		}
	}

	// move a path cell to a grid cell
	addCellToGrid (cellNumber) {
		this.mazeGrid[this.cellsList[cellNumber]["z"]][this.cellsList[cellNumber]["y"]][this.cellsList[cellNumber]["x"]] = this.pathCell;
	}

	reverseDirection(direction) {
		switch (direction) {
			case north:
				return south;
				break;
			case south:
				return north;
				break;
			case west:
				return east;
				break;
			case east:
				return west;
				break;
			case up:
				return down;
				break;
			case down:
				return up;
				break;
			default:
				return undefined;
		}
	}

	getRandomDirection() {
		return getRandomDirections[0];
	}

	getRandomDirections() {
		return this.shuffle([this.north,this.south,this.west,this.east]);
	}

	shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;

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

	isEmptyCell({z, y, x}, direction) {
		switch (direction) {
			case this.north:
				return this.isEmptyCell({"z": z, "y": y - 1, "x": x}, null);
				break;
			case this.south:
				return this.isEmptyCell({"z": z, "y": y + 1, "x": x}, null);
				break;
			case this.west:
				return this.isEmptyCell({"z": z, "y": y, "x": x - 1}, null);
				break;
			case this.east:
				return this.isEmptyCell({"z": z, "y": y, "x": x + 1}, null);
				break;
			case this.up:
				// if we're at the top level, loop around
				if (z == this.gridLevels - 1) {
					return this.isEmptyCell({"z": 0, "y": y, "x": x}, null);
				} else {
					return this.isEmptyCell({"z": z + 1, "y": y, "x": x}, null);
				}
				break;
			case this.down:
				// if we're at the bottom level, loop around
				if (z == 0) {
					return this.isEmptyCell({"z": this.gridLevels - 1, "y": y, "x": x}, null);
				} else {
					return 	this.isEmptyCell({"z": z - 1, "y": y, "x": x}, null);
				}
				break;
			default:
				if (z >= 0 && z < this.gridLevels 
				&& 	y >= 0 && y < this.gridHeight 
				&&  x >= 0 && x < this.gridWidth) {
					if (this.mazeGrid[z][y][x] == this.emptyCell) {
						console.log(`pushing: z:${z} y:${y} x:${x}`);
						this.cellsList.push({"z": z, "y": y, "x": x});
						this.addCellToGrid(this.cellsList.length - 1);
						return true;
					}
				} else {
					console.log("grid error");
				}
		}
		return false;
	}

	// isEmptyCell(z, y, x, direction) {
	// 	if (	z >= 0 && z < this.gridLevels 
	// 		&& 	y >= 0 && y < this.gridHeight 
	// 		&&  x >= 0 && x < this.gridWidth) {
	// 		return (this.mazeGrid[z][y][x] == this.emptyCell);
	// 	}
	// 	return false;
	// }

	displayMaze() {
		console.log("dislaying maze");
		console.log(this.mazeGrid);
		var asciiMaze = "";
		for (let level = 0; level < this.mazeGrid.length; level++) {

			asciiMaze += '<div id="level-' + level + '"><h3>Level #' + level + '</h3>\n';
			for (let row = 0; row < this.mazeGrid[level].length; row++) {

				asciiMaze += "<p>";
				for(let column = 0; column < this.mazeGrid[level][row].length; column++) {

					switch (this.mazeGrid[level][row][column]) {
						case this.pathCell:
							asciiMaze += "≈";
							break;
						case this.startCell:
							asciiMaze += "S";
							break;
						case this.finishCell:
							asciiMaze += "F";
							break;
						case this.emptyCell:
							asciiMaze += "&#11034;";
							break;
						case this.abovePassthroughCell:
							asciiMaze += "&uarr;";
							break;
						case this.belowPassthroughCell:
							asciiMaze += "&darr;";
							break;
						case this.verticalPassthroughCell:
							asciiMaze += "&varr;";
							break;
						case this.wallCell:
							asciiMaze += "&#11035;";
							break;
						case this.tempWallCell:
							asciiMaze += "&#11034;";
							break;
					}
				}

				asciiMaze += "</p>";
			}
			asciiMaze += "</div>";
		}
		$("#maze-game").html(asciiMaze);
	}
}