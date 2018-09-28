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
	 	
		// generate the grid
		this.mazeGrid = this.generateGrid();

		// Builds the maze
		this.fillMaze();

		this.displayMaze();
	}

	fillMaze() {
		// console.log("filling maze");

		// initialize the cellsList and add the first cell to the list
		// this.cellsList.push({ "z": 0, "y": 0, "x": random});
		this.cellsList = [{ 
			"z": 0,
			"y": 0,
			"x": this.getRandomIntInclusive(0,this.gridWidth - 1)
		}];

		while (this.cellsList.length > 0) {

			// index is the newest
			var index = this.cellsList.length - 1;
			
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
			if (index != null)
				this.cellsList.splice(index,1);
		}
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
				break;
			case this.south:
				return {"z": z, "y": y + 1, "x": x};
				break;
			case this.west:
				return {"z": z, "y": y, "x": x - 1};
				break;
			case this.east:
				return {"z": z, "y": y, "x": x + 1};
				break;
			case this.up:
				// if we're at the top level, loop around
				if (z == this.gridLevels - 1) {
					return {"z": 0, "y": y, "x": x};
				} else {
					return {"z": z + 1, "y": y, "x": x};
				}
				break;
			case this.down:
				// if we're at the bottom level, loop around
				if (z == 0) {
					return {"z": this.gridLevels - 1, "y": y, "x": x};
				} else {
					return {"z": z - 1, "y": y, "x": x};
				}
				break;
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
				break;
			case this.south:
				return this.north;
				break;
			case this.west:
				return this.east;
				break;
			case this.east:
				return this.west;
				break;
			case this.up:
				return this.down;
				break;
			case this.down:
				return this.up;
				break;
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
	displayMaze() {
		// console.log("dislaying maze grid:");

		// generated by the existing program
		// this.mazeGrid = [[
		// 	["South", "South", "South", "West", "South"],
		// 	["South", "South", "South", "West", "South"],
		// 	["South", "North", "North", "West", "South"],
		// 	["South", "South", "South", "East", "South"],
		// 	["North", "North", "North", "West", "North"]]
		// ];
		
// 	this.mazeGrid = [[
// 	["South", "South", "South", "South", "South"],
// 	["North", "North", "North", "North", "North"],
// 	["North", "South", "North", "South", "North"],
// 	["North", "North", "South", "North", "North"],
// 	["North", "North", "North", "East", "North"]
// ]];


// 	this.mazeGrid = [[
// ["South", "South", "South", "South", "South"],
// ["South", "North", "South", "North", "South"],
// ["South", "South", "North", "South", "South"],
// ["South", "South", "South", "North", "South"],
// ["North", "North", "North", "East", "North"]
// ]];

	
	var html = "";

		for (let level = 0; level < this.mazeGrid.length; level++) {
			
			// html += '<div id="level-' + level + '"><h3>Level #' + level + '</h3>\n';
			for (let row = 0; row < this.mazeGrid[level].length; row++) {

				var westClass = this.mazeGrid[level][row][0] == this.west? "b" : "w";

				var row1 = "<div class='r'><div class='" + westClass + "'></div>";
				var row2 = "<div class='r'><div class='w'></div>";
				
				// console.log(this.mazeGrid[level][row]);
				for(let column = 0; column < this.gridWidth; column++) {

					var eastClass = this.mazeGrid[level][row][column] == this.east? "b" : "w";
					var southClass = this.mazeGrid[level][row][column] == this.south? "b" : "w";

					// var upClass = this.mazeGrid[level][row][column] == this.up? "b" : "w";
					// var downClass = this.mazeGrid[level][row][column] == this.down? "b" : "w";

					var cell = "<div class='b'>"; 
					// cell += "<div class='" + upClass + "'></div>";
					// cell += "<div class='" + downClass + "'></div>";
					cell += "</div>";

					row1 += "" + cell + "<div class='" + eastClass + "'>" + ""  + "</div>";
					row2 += "<div class='" + southClass + "'>"+ "" +"</div><div class='w'></div>";

				}
				html += row1 + "<!-- end row 1 --></div>\n" + row2 + "<!-- end row 2 --></div>\n";
			}
			// html += "</div>";
		}
		$("#maze-game").html(html);
		console.log(this.mazeGrid[0]);
	}
	// end view functions
}
