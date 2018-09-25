const gridWidth = 10;
const gridHeight = 10;
const gridLevels = 2;

//  
// On the grid, a cell can be:
const emptyCell = "empty";
const abovePassthroughCell = "passthrough_above";
const belowPassthroughCell = "passthrough_below";
const verticalPassthroughCell = "vertical_above_below";
const wallCell = "wall";
const tempWallCell = "temporary_wall";
const startCell = "start";
const finishCell = "finish";

// Directions
const north = "North";
const south = "South";
const east 	= "East";
const west 	= "West";
const up 	= "Up";
const down 	= "Down";



// Grid is mazeGrid[level][width][height]
var mazeGrid = [];

function main() {
	buildGrid();
	buildMaze();
	displayMaze();
	console.log(mazeGrid);
	// console.log(traverseMaze(1,2,0,north));
}

function buildGrid() {
	// Builds the grid initially all empty
	console.log("building grid");
	// mazeGrid = Array(gridLevels).fill(Array(gridWidth).fill(Array(gridHeight).fill(emptyCell)));
	mazeGrid = new Array(gridLevels); 
 
	for(let i = 0; i < gridLevels; i++) {
		mazeGrid[i] = new Array(gridHeight);
		for(let j = 0; j < gridHeight; j++) {
			mazeGrid[i][j] = new Array(gridWidth);
			mazeGrid[i][j].fill(emptyCell);
		}
	}

}

function buildMaze() {
	// start somewhere on the edge 
	// [z][y][x]
	console.log("building maze");
	let currentZ = 0;
	let currentY = 0;
	let currentX = 0;

	let cellsRemaining = gridLevels * gridWidth * gridHeight;

	let tempColumn =  getRandomIntInclusive(0,gridWidth - 1);

	// start on the top
	mazeGrid[0][0][tempColumn] = startCell;
	currentX = tempColumn;
	mazeGrid[0][gridHeight - 1 ][tempColumn] = finishCell;

	// cellList = [];
	// cellsRemaining = 10;
	// while (cellsRemaining > 0) {
	// // 	let direc = getRandomDirection();
	// // 	let directions = traverseMaze(currentZ, currentY, currentX, direc);
	// // 	if ( directions == {"z": currentZ, "y": currentY, "x": currentX} ) {
	// // 		directions = traverseMaze(currentZ, currentY, currentX, reverseDirection(direc));
	// // 		console.log ("reverse");
	// // 	}
	// // 	else {
	// // 		setCellValue(directions, wallCell); 
	// // 	}
	// // 	console.log(direc);
	// // 	console.log(directions);

		
	// 	cellsRemaining--;
	// }
	console.log({"z": currentZ, "y": currentY, "x": currentX});
	console.log(traverseToNearbyAvailable({"z": currentZ, "y": currentY, "x": currentX}));

	// let direc = getRandomDirection();
	// let directions = traverseMaze(currentZ, currentY, currentX, direc);
	// let curr = {"z": currentZ, "y": currentY, "x": currentX};
	// console.log (curr);
	// console.log(direc);
	// console.log (directions);


}

function traverseToNearbyAvailable({z, y, x}) {
	theDirections = getRandomDirections();
	for (var i = 0; i <= theDirections.length - 1; i++) {
		theCell = traverseGrid(z, y, x, theDirections[i]);
		if ( theCell["x"] != -1) {
			console.log(theDirections[i]);
			return theCell;
		}
	}
	return {"z": -1, "y": -1, "x": -1};
}



function getRandomDirections() {
	return shuffle([north,south,west,east]);
}

function reverseDirection(direction) {
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
	}
}

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}


// see if we can build a maze there
function isEmptyCell(z, y, x, direction) {
	if (	z >= 0 && z < gridLevels 
		&& 	y >= 0 && y < gridHeight 
		&&  x >= 0 && x < gridWidth) {
		return (mazeGrid[z][y][x] == emptyCell);
	}
	return false;
}


function traverseGrid(z, y, x, direction) {
	switch (direction) {
		case north:
			if (isEmptyCell(z, y - 1, x)) {
				return {"z": z, "y": (y - 1), "x": x};
			}
			break;
		case south:
			if (isEmptyCell(z, y + 1, x)) {
				return {"z": z, "y": (y + 1), "x": x};
			}
			break;
		case west:
			if (isEmptyCell(z, y, x - 1)) {
				return {"z": z, "y": y, "x": (x - 1)};
			}
			break;
		case east:
			if (isEmptyCell(z, y, x + 1)) {
				return {"z": z, "y": y, "x": (x + 1)};
			}
			break;
		case up:
			// if we're at the top level, loop around
			if (z == gridLevels - 1) {
				let tempNewZ = 0;
			} else {
				let tempNewZ = z + 1;
			}
			if(isEmptyCell(tempNewZ, y, x)) {
				return {"z": tempNewZ, "y": y, "x": x};
			}
			break;
		case down:
			// if we're at the bottom level, loop around
			if (z == 0) {
				let tempNewZ = gridLevels - 1;
			} else {
				let tempNewZ = z - 1;
			}
			if(isEmptyCell(tempNewZ, y, x)) {
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

// checks to see if we can move in a direction in the maze:
// if we can, it returns an array with the new cell location
// else it returns an array with the same location

function traverseMaze(z, y, x, direction) {

	// set the default return values
	let newZ = z;
	let newX = x;
	let newY = y;

	switch (direction) {
		case north:
			if (y != 0 && isNavigatableCell(z, y - 1, x)) {
				newY = y - 1;
			} // else we keep it how it is
			break;
		case south:
			if (y != gridHeight - 1 && isNavigatableCell(z, y + 1, x)) {
				newY = y + 1; 
			} // else we're at the bottom of the grid, stay at the same place
			break;
		case west:
			if (x != 0 && isNavigatableCell(z, y, x - 1)) {
				newX = x - 1;
			} // else we keep it how it is
			break;
		case east:
			if (x != gridWidth - 1 && isNavigatableCell(z, y, x + 1)) {
				newX = x + 1; 
			} // else we're at the right edge of the grid, stay at the same place
			break;
		case up:
			// if we're at the top level, loop around
			if (z == gridLevels - 1) {
				let tempNewZ = 0;
			} else {
				let tempNewZ = z + 1;
			}
			if(isNavigatableCell(tempNewZ, y, x)) {
				newZ = tempNewZ;
			} // else we keep it how it is
			break;
		case down:
			// if we're at the bottom level, loop around
			if (z == 0) {
				let tempNewZ = gridLevels - 1;
			} else {
				let tempNewZ = z - 1;
			}
			if(isNavigatableCell(tempNewZ, y, x)) {
				newZ = tempNewZ;
			} // else we keep it how it is
			break;
		default:
			console.log ("not a direction");
			// incorrect direction, throw error
			// TODO: need error handling
	}

	return {"z": newZ, "y": newY, "x": newX};
}

// see if a user can navigate there
function isNavigatableCell(z, y, x) {
	if (	z >= 0 && z <= gridLevels 
		&& 	y >= 0 && y <= gridHeight 
		&&  x >= 0 && x <= gridWidth) {
		return (mazeGrid[z][y][x] == emptyCell
			||  mazeGrid[z][y][x] == abovePassthroughCell
			||  mazeGrid[z][y][x] == belowPassthroughCell
			||  mazeGrid[z][y][x] == verticalPassthroughCell);

	}
	return false;
}

//
// creates an ascii maze from a 2D array (mazeGrid)
