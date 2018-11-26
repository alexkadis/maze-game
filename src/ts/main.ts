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
	// MyMaze = new Maze(GridLayers, GridHeight, GridWidth);

	// Procedural Maze
	MyMaze = new Maze(0,0,0, "N4IgsghgXgpgChALgCxALhAEWwZUwUQDlMcB1HAVQp3yNIvMuqp0qKuM0KPws7tKFqPCrXwk8ZEuVG96wkh3LZi+MoNIESXenmykD3YoU1qCxAzgBCQ7gxpXNV5zaFqaZUXk2spRXAamNhRWXC4unOHBvFRWPCaC4ia+IeK8hJwyIRmYgqIETKp4hFaSzCwhziVRGobh+FHhpI3OzS3tpR1d3TXVNfTErT3dbe0NwxOTU9MzkyAANCA4iBAATogAMgD2AMZIAJZbAHboIMAAOiAAWpdoAAzzlwCatw+XABqvAL4LIPhHABNtntEIcThgLtdXo8QC90ABWGGfdAANh+iysMAAzogEChTr9ILBMPsAGak-Y7ACuABtEABPdAPEAAcVW+wBpA5+LQAA5FmyOQAJGD7ADmyEQ6H5rPZQIg9Jgqyx6AALF8gA");
	

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

function testBestPath() {
	let path = MyMaze.BestPath.split("");
	path.forEach(direction => {
		switch (direction) {
			case "N":
				goNorth();
				break;
			case "S":
				goSouth();
				break;
			case "E":
				goEast();
				break;
			case "W":
				goWest();
				break;
			case "U":
				goUp();
				break;
			case "D":
				goDown();
				break;
		}
	});

}
document.addEventListener('DOMContentLoaded',() => {
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
