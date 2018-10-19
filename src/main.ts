let currentLayer: number;
let GridLayers: number;
let GridHeight: number;
let GridWidth: number;
let MyCharacter: Character;

function main () {
	currentLayer = 0;
	GridLayers = 4;
	GridHeight = 8;
	GridWidth = 8;

	const myMaze = new Maze(GridLayers, GridHeight, GridWidth);

	const mazeViewer = new MazeView(myMaze.MazeGrid, myMaze.EndCell);
	mazeViewer.displayMaze();
	console.table(myMaze.MazeGrid[0][0]);

	showLayerHideOthers(currentLayer);

	MyCharacter = new Character("pinkdude", "pink", myMaze.MazeGrid[0][0][0], myMaze.MazeGrid, myMaze.EndCell);

}
https://stackoverflow.com/questions/1402698/binding-arrow-keys-in-js-jquery
document.addEventListener('keydown', function (e) {
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
			goDown()
			break;
		case 69: // 1
			goUp()
			break;
		case 72:
			showHelp();
			break;
		default: return; // exit this handler for other keys
	}
	e.preventDefault(); // prevent the default action (scroll / move caret)
});

function showHelp() {
	
}

function showLayerHideOthers (layerChoice: number) {
	if (GridLayers > 1) {
		for (let layer = 0; layer < GridLayers; layer++) {
			const layerId: string = `#layer${layer}`;
			if (layer === layerChoice)
				$(layerId).show();
			else
				$(layerId).hide();
		}
	}
}

function goNorth () {
	MyCharacter.move(MyCharacter.North);
}
function goEast () {
	MyCharacter.move(MyCharacter.East);
}
function goSouth () {
	MyCharacter.move(MyCharacter.South);
}
function goWest () {
	MyCharacter.move(MyCharacter.West);
}

function goUp () {
	if (currentLayer < GridLayers - 1)
		currentLayer++;
	else
		currentLayer = 0;
	showLayerHideOthers (currentLayer);
	MyCharacter.move(MyCharacter.Up);
}

function goDown () {
	if (currentLayer === 0)
		currentLayer = GridLayers - 1;
	else
		currentLayer--;
	showLayerHideOthers (currentLayer);
	MyCharacter.move(MyCharacter.Down);
}
