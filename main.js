"use strict";

function main() {
	var myMaze = new Maze(5,5,1);
}
class Maze {
	constructor(gridHeight, gridWidth, gridLevels) {

		// Builds the grid initially all empty
		// console.log("building grid");

		this.gridHeight = gridHeight;
		this.gridWidth = gridWidth;
		this.gridLevels = gridLevels;
		
		// cells
		// this.emptyCell = "empty";
		// this.abovePassthroughCell = "passthrough_above";
		// this.belowPassthroughCell = "passthrough_below";
		// this.verticalPassthroughCell = "passthrough_vertical";
		// this.wallCell = "wall";
		// this.tempWallCell = "temporary_wall";
		// this.startCell = "start";
		// this.finishCell = "finish";

		this.cellsList = [];

		// Directions
		this.north = "North";
		this.south = "South";
		this.east  = "East";
		this.west  = "West";
		this.up    = "Up";
		this.down  = "Down";
		
		this.cardinalDirections = new Array(this.north, this.east, this.south, this.west);
		

		// generate the grid
		this.mazeGrid = this.generateGrid();

		// Builds the maze
		this.fillMaze();

		this.displayMaze();
	}

	async fillMaze() {
		// console.log("filling maze");

		// initialize the cellsList and add the first cell to the list
		// this.cellsList.push({ "z": 0, "y": 0, "x": random});
		this.cellsList = [{ 
			"z": 0,
			"y": this.getRandomIntInclusive(0,this.gridHeight - 1),
			"x": this.getRandomIntInclusive(0,this.gridWidth - 1)
		}];

		var index = null;

		while (this.cellsList.length > 0) {

			// index is the newest
			index = this.cellsList.length - 1;
			
			// random index (something about this fails)
			// var index = this.getRandomIntInclusive(0, this.cellsList.length);
		
			var currentCell = this.cellsList[index];
			// console.log(currentCell);
			var directions = this.getRandomDirections();

			for (let i = 0; i < directions.length; i++) {
				var nextCell = this.directionModifier(this.cellsList[index],directions[i])
				if (this.isEmptyCell(nextCell)) {
					// console.log(directions[i]);
					// we found a workable direction
					this.mazeGrid[currentCell["z"]][currentCell["y"]][currentCell["x"]] = directions[i];
					this.mazeGrid[nextCell["z"]][nextCell["y"]][nextCell["x"]] = this.reverseDirection(directions[i]);
					this.cellsList.push(nextCell);
					index = null;
					break;	
				}
			}
			if (index != null) {
				this.cellsList.splice(index,1);
			}
			
			this.displayMaze();
			await this.sleep(800);
		} 
	}
	
	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	copyCellToGrid (cellNumber) {
		this.mazeGrid[this.cellsList[cellNumber]["z"]][this.cellsList[cellNumber]["y"]][this.cellsList[cellNumber]["x"]] = this.pathCell;
	}

	generateGrid() {
		var tempGrid = new Array(this.gridLevels);
		for(let i = 0; i < this.gridLevels; i++) {
			tempGrid[i] = new Array(this.gridHeight);
			for(let j = 0; j < this.gridHeight; j++) {
				tempGrid[i][j] = new Array(this.gridWidth);
				tempGrid[i][j].fill(this.emptyCell);
			}
		}
		return tempGrid;
	}

	isEmptyCell({"z": z, "y": y, "x": x}) {
		return (z >= 0 && z < this.gridLevels 
			&& 	y >= 0 && y < this.gridHeight 
			&&  x >= 0 && x < this.gridWidth
			&& this.mazeGrid[z][y][x] == this.emptyCell);
	}
	
	directionModifier({"z": z, "y": y, "x": x}, direction) {
		switch (direction) {
			case this.north:
				return {"z": z, "y": y - 1, "x": x};
			case this.south:
				return {"z": z, "y": y + 1, "x": x};
			case this.west:
				return {"z": z, "y": y, "x": x - 1};
			case this.east:
				return {"z": z, "y": y, "x": x + 1};
			case this.up:
				// if we're at the top level, loop around
				if (z == this.gridLevels - 1) {
					return {"z": 0, "y": y, "x": x};
				} else {
					return {"z": z + 1, "y": y, "x": x};
				}
			case this.down:
				// if we're at the bottom level, loop around
				if (z == 0) {
					return {"z": this.gridLevels - 1, "y": y, "x": x};
				} else {
					return {"z": z - 1, "y": y, "x": x};
				}
		}
		return {"z": z, "y": y, "x": x}; 
	}

	// start utility functions

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

	reverseDirection(direction) {
		switch (direction) {
			case this.north:
				return this.south;
			case this.south:
				return this.north;
			case this.west:
				return this.east;
			case this.east:
				return this.west;
			case this.up:
				return this.down;
			case this.down:
				return this.up;
			default:
				return undefined;
		}
	}
	getRandomIntInclusive(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
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

	// end utility functions

	
	// view functions
	arrow(direction) {
		switch (direction) {
			case this.north:
				return "↑"; 
			case this.south:
				return "↓"; 
			case this.west:
				return "←";
			case this.east:
				return "→"; 
			case this.up:
				return "u";
			case this.down:
				return "d";
			default:
				return "";
		}
	}

	isTurn (direction1, direction2) {
		return !(direction1 == direction2 || this.reverseDirection(direction1) == direction2);
	}
	
	turnDirection(direction1, direction2) {
			if ((direction1 == this.north && direction2 == this.east) 
			|| (direction1 == this.east && direction2 == this.south)
			|| (direction1 == this.south && direction2 == this.west)
			|| (direction1 == this.west && direction2 == this.north))
				return "right";
			else if ((direction1 == this.north && direction2 == this.west) 
			|| (direction1 == this.west && direction2 == this.south)
			|| (direction1 == this.south && direction2 == this.east)
			|| (direction1 == this.east && direction2 == this.north))
				return left;
			else
				return "straight";
	}

	borderPlacement(cell) {
		var direction = cell;
		var turn = this.turnDirection(cell);
		if (direction == this.north) {
			if (turn == "right") {
				return "top left";
			} else if (turn == "left") {
				return "top right";
			} else {
				return "left right";
			}
		} else if (direction == this.east) {
			if (turn == "right") {
				return "top right";
			} else if (turn == "left") {
				return "bottom right";
			} else {
				return "top bottom";
			}
		} else if (direction == this.south) {
			if (turn == "right") {
				return "bottom right";
			} else if (turn == "left") {
				return "bottom left";
			} else {
				return "left right";
			}
		}  else if (direction == this.west) {
			if (turn == "right") {
				return "bottom left";
			} else if (turn == "left") {
				return "top left";
			} else {
				return "top bottom";
			}
		} else {
			return "error-direction";
		}
	}

	displayMaze() {
		// console.log("dislaying maze grid:");
	
	var html = "";

		// for (let level = 0; level < this.mazeGrid.length; level++) {
			
		// 	// html += '<div id="level-' + level + '"><h3>Level #' + level + '</h3>\n';
		// 	for (let row = 0; row < this.mazeGrid[level].length; row++) {

		// 		var westClass = this.mazeGrid[level][row][0] == this.west? "b" : "w";

		// 		var row1 = "<div class='r'><div class='" + westClass + "'></div>";
		// 		var row2 = "<div class='r'><div class='w'></div>";
				
		// 		// console.log(this.mazeGrid[level][row]);
		// 		for(let column = 0; column < this.gridWidth; column++) {

		// 			var eastClass = this.mazeGrid[level][row][column] == this.east? "b" : "w";
		// 			var southClass = this.mazeGrid[level][row][column] == this.south? "b" : "w";

		// 			// var upClass = this.mazeGrid[level][row][column] == this.up? "b" : "w";
		// 			// var downClass = this.mazeGrid[level][row][column] == this.down? "b" : "w";

		// 			var cell = "<div class='b'>"; 
		// 			// cell += "<div class='" + upClass + "'></div>";
		// 			// cell += "<div class='" + downClass + "'></div>";
		// 			cell += "</div>";

		// 			row1 += "" + cell + "<div class='" + eastClass + "'>" + ""  + "</div>";
		// 			row2 += "<div class='" + southClass + "'>"+ "" +"</div><div class='w'></div>";

		// 		}
		// 		html += row1 + "<!-- end row 1 --></div>\n" + row2 + "<!-- end row 2 --></div>\n";
		// 	}
		// 	// html += "</div>";
		// }
		// $("#maze-game").html(html);


		for (let level = 0; level < this.mazeGrid.length; level++) {
			
			// html += '<div id="level-' + level + '"><h3>Level #' + level + '</h3>\n';
			for (let row = 0; row < this.mazeGrid[level].length; row++) {

				// var westClass = this.mazeGrid[level][row][0] == this.west? "b" : "w";

				// var row1 = "<div class='r'><div class='" + westClass + "'></div>";
				html += "<div class='r'>";
				
				// console.log(this.mazeGrid[level][row]);
				for(let column = 0; column < this.gridWidth; column++) {

					// var eastClass = this.mazeGrid[level][row][column] == this.east? "b" : "w";
					// var southClass = this.mazeGrid[level][row][column] == this.south? "b" : "w";

					// var upClass = this.mazeGrid[level][row][column] == this.up? "b" : "w";
					// var downClass = this.mazeGrid[level][row][column] == this.down? "b" : "w";
					
					// if(this.isTurn((this.mazeGrid[level][row][column - 1], this.mazeGrid[level][row][column])))
						// console.log ("TURN: " + this.mazeGrid[level][row][column] + " to " + this.mazeGrid[level][row][column + 1]);

					var cell = "<div class='b " + this.borderPlacement(this.mazeGrid[level][row][column]) + " blue'>" + this.arrow(this.mazeGrid[level][row][column]); 
					

					
					// cell += "<div class='" + upClass + "'></div>";
					// cell += "<div class='" + downClass + "'></div>";
					cell += "</div>";
					html += cell;

				}
				html += "</div>"; 
			}
			// html += "</div>";
		}
		$("#maze-game").html(html);


		console.log(this.mazeGrid[0]);
	}
	// end view functions
}
