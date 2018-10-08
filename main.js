"use strict";
var currentLayer;
var GridLayers;
var GridHeight;
var GridWidth;
var MyCharacter;
function main() {
    currentLayer = 0;
    GridLayers = 4;
    GridHeight = 5;
    GridWidth = 5;
    var myMaze = new Maze(GridLayers, GridHeight, GridWidth);
    myMaze.fillMaze();
    myMaze.displayMaze();
    showLayerHideOthers(currentLayer);
    MyCharacter = new Character("pinkdude", "pink", myMaze.MazeGrid[0][0][0], myMaze.MazeGrid);
}
function showLayerHideOthers(layerChoice) {
    if (GridLayers > 1) {
        for (var layer = 0; layer < GridLayers; layer++) {
            var layerId = "#layer" + layer;
            if (layer === layerChoice) {
                $(layerId).show();
            }
            else {
                $(layerId).hide();
            }
        }
    }
}
function goNorth() {
    MyCharacter.move(MyCharacter.North);
    console.log(MyCharacter.CurrentLocation);
}
function goEast() {
    MyCharacter.move(MyCharacter.East);
    console.log(MyCharacter.CurrentLocation);
}
function goSouth() {
    MyCharacter.move(MyCharacter.South);
    console.log(MyCharacter.CurrentLocation);
}
function goWest() {
    MyCharacter.move(MyCharacter.West);
    console.log(MyCharacter.CurrentLocation);
}
function goUp() {
    if (currentLayer < GridLayers - 1) {
        currentLayer++;
    }
    else {
        currentLayer = 0;
    }
    showLayerHideOthers(currentLayer);
    MyCharacter.move(MyCharacter.Up);
    console.log(MyCharacter.CurrentLocation);
}
function goDown() {
    if (currentLayer === 0) {
        currentLayer = GridLayers - 1;
    }
    else {
        currentLayer--;
    }
    showLayerHideOthers(currentLayer);
    MyCharacter.move(MyCharacter.Down);
    console.log(MyCharacter.CurrentLocation);
}
