let currentLayer: number;
let GridLayers: number;
let GridHeight: number;
let GridWidth: number;
let MyCharacter: Character;
let MyCharacterView: ICharacterView;
let Utilities: Utils;
let MyMaze: Maze;
// let MyNavigator: MazeNavigator;

function main() {
	Utilities  = new Utils();
	currentLayer = 0;
	GridLayers = 4;
	GridHeight = 8;
	GridWidth = 8;

	// Random Maze
	MyMaze = new Maze(GridLayers, GridHeight, GridWidth);

	// Procedural Maze
	// MyMaze = new Maze(0,0,0, "N4IgsghgXgpgChALgCxALhAUQMq4Kp4ByA6gCLZ7bnaaZHHFE5OGGnVN51eYnmaleDUoVqE8DYtkZtBAugCFyZWkUoUpVHI2YayknbxKjWRzAsoTSMglcZdpNaetxzBXNjTUkpKk70ocCiEGIndXMgVsBRjaZ3M8BUIYlJjE2IFokXYSVLylMmoY0wkuFOj8yqq8xlT9GiU0lPTq1rzWAnlSKOIotrbzatpW2or+8YnJqemZypAAGhBsRAgAJ0QAGQB7AGMkAEstgDt0EGAAHRAALUu0AAZ5y4BNW4fLgA1XgF8FrCOAE22e0QhxOGAu11ejxAL3QAHZoZ90ABmH6LBQwADOiAQKFOv0gsFI+wAZiT9jsAK4AG0QAE90A8QABxVb7f7Edl4tAADkWrPZAAkYPsAObIRDoPkstmAiB0mCrTHoAAsXyAA");

	const mazeViewer = new MazeView(MyMaze);
	mazeViewer.displayMaze();
	showLayerHideOthers(currentLayer);

	MyCharacter = new Character("happyemoji", MyMaze);

	MyCharacterView = new HTMLCharacterView(
		MyCharacter,
		String.fromCharCode(0xD83D, 0xDE00),  // 😀
		String.fromCharCode(0xD83D, 0xDE0E),  // 😎
		String.fromCharCode(0xD83C, 0xDFC1),  // 🏁
		String.fromCharCode(0xD83C, 0xDF89)); // 🎉
}

// https://stackoverflow.com/questions/1402698/binding-arrow-keys-in-js-jquery
document.addEventListener("keydown", function(e) {
	e = e || window.event;
	switch (e.which || e.keyCode) {
		case 65: // a
		case 37: // left
			goWest();
			break;
		case 87: // w
		case 38: // up
			goNorth();
			break;
		case 68: // d
		case 39: // right
			goEast();
			break;
		case 83: // s
		case 40: // down
			goSouth();
			break;
		case 81: // 1
			goDown();
			break;
		case 69: // 1
			goUp();
			break;
		default: return; // exit this handler for other keys
	}
	e.preventDefault (); // prevent the default action (scroll / move caret)
});

function showLayerHideOthers(layerChoice: number) {
	if (GridLayers > 1) {
		for (let layer = 0; layer < GridLayers; layer++) {
			const layerId: string = `#layer${layer}`;
			if (layer === layerChoice)
				(document.body.querySelector(layerId) as HTMLElement).style.display = "block";
			else
				(document.body.querySelector(layerId) as HTMLElement).style.display = "none";
		}
	}
}

function goNorth() {
	MyCharacter.move(Utilities.North);
	MyCharacterView.move();
}

function goEast() {
	MyCharacter.move(Utilities.East);
	MyCharacterView.move();
}

function goSouth() {
	MyCharacter.move(Utilities.South);
	MyCharacterView.move();
}

function goWest() {
	MyCharacter.move(Utilities.West);
	MyCharacterView.move();
}

function goUp() {
	if (currentLayer < GridLayers - 1)
		currentLayer++;
	else
		currentLayer = 0;
	showLayerHideOthers (currentLayer);
	MyCharacter.move(Utilities.Up);
	MyCharacterView.move();
}

function goDown() {
	if (currentLayer === 0)
		currentLayer = GridLayers - 1;
	else
		currentLayer--;
	showLayerHideOthers (currentLayer);
	MyCharacter.move(Utilities.Down);
	MyCharacterView.move();
}
