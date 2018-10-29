let currentLayer: number;
let GridLayers: number;
let GridHeight: number;
let GridWidth: number;
let MyCharacter: Character;
let MyCharacterView: ICharacterView;

function main () {
	currentLayer = 0;
	GridLayers = 4;
	GridHeight = 8;
	GridWidth = 8;

	// const exampleMaze: string = "CIUQqiqmYMq3A6rErgDkTzIm7EHpwjoYbIyJE6y4pH7aqalG4EKqzAJwxIpa"
	// + "VKLXSkSfLPWDA6qCJHy5MM2Sj4AhAhmqRYGg4mAGwYrMx2ZeBAiZjdeRZlUjaZW-QakR4MhsYMDXz8tUw11S"
	// + "ltA6I1ZGJjEeJB4+PgU9IzMrUJkrLzMqMCxCm47Lwz0fKro0FoDfGrGpuaqgB8AbwAiAC1OgC4ABgAaToBNfoA2EYANfoB2AF8gA";

	// const uncompressed = "DEUEDEDEUUSSUSWSEEEDNESSUWUUNWWWNUSENDNDNWSUUWNUUWSWUSENUNWSSUEENENDNUWUWWSUEESDSUUSUUUSWSE"
	// + "SWWNDEDSWNNDENUSUESSENDDWUSEEUEEDNWWUNEDDDWSEUSUBWWDNNUUEDSBBBWDBBUNNESEENDNNNESUUWWWWBBUUUSDSUUNUEENWNEDWWD"
	// + "DDBWSBBBESSUESSDDNUNDBBBBBSSDDDNBWUNBSEUUUWWWBBBBBBBBBDWBBBBBBBBBBWBBBBBBEBBBBBBBBBBBBSSBBBBBBBBBBBBBBBBBBBB"
	// + "BBBBBBBBBBBBBBBWWWNEBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBWWBBBBBNNWSUSDBBUUBBEBBBBBBBBBNBBBBBBBBBBBBBBBBBBBBBBB"
	// + "BBBBBBBBDESWBBNWBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB|"
	// + "{\"Z\":0,\"Y\":6,\"X\":7}";

	// const myMaze = new Maze(GridLayers, GridHeight, GridWidth, exampleMaze);

	const myMaze = new Maze(GridLayers, GridHeight, GridWidth);

	const mazeViewer = new MazeView(myMaze.MazeGrid, myMaze.EndLocation);
	mazeViewer.displayMaze();

	// console.log(myMaze.MazePath);
	// console.log(myMaze.MazePathCompressed);

	// console.table(myMaze.MazeGrid[0][0]);

	showLayerHideOthers(currentLayer);

	MyCharacter = new Character("happyemoji", myMaze.MazeGrid[0][0][0], myMaze.MazeGrid, myMaze.EndLocation);

	MyCharacterView = new HTMLCharacterView(
		MyCharacter.Name,
		String.fromCharCode(0xD83D, 0xDE00),  // 😀
		String.fromCharCode(0xD83D, 0xDE0E),  // 😎
		String.fromCharCode(0xD83C, 0xDFC1),  // 🏁
		String.fromCharCode(0xD83C, 0xDF89)); // 🎉

	MyCharacterView.move(MyCharacter.move());
}
// https://stackoverflow.com/questions/1402698/binding-arrow-keys-in-js-jquery
document.addEventListener("keydown", function (e) {
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
	MyCharacterView.move(MyCharacter.move(MyCharacter.North));
}

function goEast () {
	MyCharacterView.move(MyCharacter.move(MyCharacter.East));
}

function goSouth () {
	MyCharacterView.move(MyCharacter.move(MyCharacter.South));
}

function goWest () {
	MyCharacterView.move(MyCharacter.move(MyCharacter.West));
}

function goUp () {
	if (currentLayer < GridLayers - 1)
		currentLayer++;
	else
		currentLayer = 0;
	showLayerHideOthers (currentLayer);
	MyCharacterView.move(MyCharacter.move(MyCharacter.Up));
}

function goDown () {
	if (currentLayer === 0)
		currentLayer = GridLayers - 1;
	else
		currentLayer--;
	showLayerHideOthers (currentLayer);
	MyCharacterView.move(MyCharacter.move(MyCharacter.Down));
}
