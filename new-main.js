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


		// fill from a starting point
		this.cellsList.push({
					"z": 0,
					"y": 0,
					"x": this.getRandomIntInclusive(0,this.gridWidth - 1)});
		this.fillMaze();

		// Builds the maze
		console.log(this.cellsList);
		this.displayMaze();

	}
	getRandomIntInclusive(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
	}


	// carve the path
	fillMaze() {

		var directions = this.getRandomDirections();
		for (var i = 0; i < directions.length - 1; i++) {
			var tempNewCell = this.traverseGrid(
								this.cellsList[this.cellsList.length - 1]["z"],
								this.cellsList[this.cellsList.length - 1]["y"],
								this.cellsList[this.cellsList.length - 1]["x"],
								directions[i]);
			if (tempNewCell["x"] != -1 ) {
				this.cellsList.push(tempNewCell);
				this.addCellToGrid(this.cellsList.length - 1);
			}
		}

			this.addCellToGrid(0);
		// while(this.cellsList.length > 0) {
			
		// }
	}

	// move a path cell to a grid cell
	addCellToGrid (cellNumber) {
		this.mazeGrid[this.cellsList[cellNumber]["z"]][this.cellsList[cellNumber]["y"]][this.cellsList[cellNumber]["x"]]= this.pathCell;
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

	getRandomDirections() {
		return this.shuffle([this.north,this.south,this.west,this.east]);
	}



	traverseGrid(z, y, x, direction) {
		switch (direction) {
			case this.north:
				if (this.isEmptyCell(z, y - 1, x)) {
					return {"z": z, "y": (y - 1), "x": x};
				}
				break;
			case this.south:
				if (this.isEmptyCell(z, y + 1, x)) {
					return {"z": z, "y": (y + 1), "x": x};
				}
				break;
			case this.west:
				if (this.isEmptyCell(z, y, x - 1)) {
					return {"z": z, "y": y, "x": (x - 1)};
				}
				break;
			case this.east:
				if (this.isEmptyCell(z, y, x + 1)) {
					return {"z": z, "y": y, "x": (x + 1)};
				}
				break;
			case this.up:
				// if we're at the top level, loop around
				if (z == gridLevels - 1) {
					let tempNewZ = 0;
				} else {
					let tempNewZ = z + 1;
				}
				if(this.isEmptyCell(tempNewZ, y, x)) {
					return {"z": tempNewZ, "y": y, "x": x};
				}
				break;
			case this.down:
				// if we're at the bottom level, loop around
				if (z == 0) {
					let tempNewZ = gridLevels - 1;
				} else {
					let tempNewZ = z - 1;
				}
				if(this.isEmptyCell(tempNewZ, y, x)) {
					return {"z": tempNewZ, "y": y, "x": x};
				}
				break;
			default:
				console.log ("not a direction");
				// incorrect direction, throw error
				// TODO: need error handling
		}

		return {"z": -1, "y": -1, "x": -1};
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

	isEmptyCell(z, y, x, direction) {
		if (	z >= 0 && z < this.gridLevels 
			&& 	y >= 0 && y < this.gridHeight 
			&&  x >= 0 && x < this.gridWidth) {
			return (this.mazeGrid[z][y][x] == this.emptyCell);
		}
		return false;
	}

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