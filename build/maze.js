"use strict";
var Cell = /** @class */ (function () {
    function Cell(z, y, x) {
        this.North = false;
        this.East = false;
        this.South = false;
        this.West = false;
        this.Up = false;
        this.Down = false;
        this.Z = z;
        this.Y = y;
        this.X = x;
    }
    return Cell;
}());
var Character = /** @class */ (function () {
    function Character(name, color, startingLocation, mazeGrid, endCell) {
        this.endCell = endCell;
        this.North = "North";
        this.East = "East";
        this.South = "South";
        this.West = "West";
        this.Up = "Up";
        this.Down = "Down";
        this.Color = color;
        this.Name = name;
        this.CurrentLocation = startingLocation;
        this.MazeGrid = mazeGrid;
        this.GridLayers = this.MazeGrid.length;
        this.GridWidth = this.MazeGrid[0].length;
        this.GridHeight = this.MazeGrid[0][0].length;
        this.EndCell = endCell;
        this.CharacterIcon = "😀";
        this.EndIcon = "🏁";
        this.move("");
    }
    Character.prototype.move = function (direction) {
        $(".y" + this.CurrentLocation.Y + "x" + this.CurrentLocation.X).text("");
        $(".y" + this.CurrentLocation.Y + "x" + this.CurrentLocation.X).removeClass(this.Name);
        switch (direction) {
            case this.North:
                if (this.CurrentLocation.North && this.CurrentLocation.Y > 0)
                    this.CurrentLocation = this.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y - 1][this.CurrentLocation.X];
                break;
            case this.East:
                if (this.CurrentLocation.East && this.CurrentLocation.X < this.GridWidth - 1)
                    this.CurrentLocation = this.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y][this.CurrentLocation.X + 1];
                break;
            case this.South:
                if (this.CurrentLocation.South && this.CurrentLocation.Y < this.GridHeight - 1)
                    this.CurrentLocation = this.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y + 1][this.CurrentLocation.X];
                break;
            case this.West:
                if (this.CurrentLocation.West && this.CurrentLocation.X > 0)
                    this.CurrentLocation = this.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y][this.CurrentLocation.X - 1];
                break;
            case this.Up:
                if (this.CurrentLocation.Z === this.GridLayers - 1)
                    this.CurrentLocation = this.MazeGrid[0][this.CurrentLocation.Y][this.CurrentLocation.X];
                else
                    this.CurrentLocation = this.MazeGrid[this.CurrentLocation.Z + 1][this.CurrentLocation.Y][this.CurrentLocation.X];
                break;
            case this.Down:
                if (this.CurrentLocation.Z === 0)
                    this.CurrentLocation = this.MazeGrid[this.GridLayers - 1][this.CurrentLocation.Y][this.CurrentLocation.X];
                else
                    this.CurrentLocation = this.MazeGrid[this.CurrentLocation.Z - 1][this.CurrentLocation.Y][this.CurrentLocation.X];
                break;
            default:
                // console.log(`Invalid attempt to move from ${this.CurrentLocation} ${direction}`);
                break;
        }
        if (this.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y][this.CurrentLocation.X] === this.EndCell) {
            this.CharacterIcon = "😎";
            this.EndIcon = "🎉";
            $(".y" + this.CurrentLocation.Y + "x" + this.CurrentLocation.X).addClass("game-won");
            $(".new-button").show();
            $(".desc").hide();
            $(".gameButtons").hide();
            $(".mazeHeader").hide();
        }
        $(".winter.y" + this.EndCell.Y + "x" + this.EndCell.X).text(this.EndIcon);
        $(".y" + this.CurrentLocation.Y + "x" + this.CurrentLocation.X).text(this.CharacterIcon);
        $(".y" + this.CurrentLocation.Y + "x" + this.CurrentLocation.X).addClass(this.Name);
    };
    return Character;
}());
var Maze = /** @class */ (function () {
    function Maze(gridLayers, gridWidth, gridHeight) {
        this.gridLayers = gridLayers;
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        // public Maze: any;
        this.North = "North";
        this.East = "East";
        this.South = "South";
        this.West = "West";
        this.Up = "Up";
        this.Down = "Down";
        this.GridLayers = gridLayers;
        this.GridWidth = gridWidth;
        this.GridHeight = gridHeight;
        // generate the grid
        this.MazeGrid = this.generateGrid();
        // create the cells list
        this.CellsList = [new Cell(-1, -1, -1)];
        this.EndCell = new Cell(-1, -1, -1);
        this.fillMaze();
        this.EndCell = this.MazeGrid[0][this.getRandomIntInclusive(1, this.gridHeight - 1)][this.getRandomIntInclusive(1, this.gridWidth - 1)];
        this.encodeMaze();
    }
    Maze.prototype.fillMaze = function () {
        this.fillMazeRandom();
        // this.fillMazeProcedural();
    };
    Maze.prototype.fillMazeProcedural = function () {
        // let pro : string = "";
        // this.MazeGrid = $.parseJSON(atob(pro));
    };
    Maze.prototype.encodeMaze = function () {
        // console.log(btoa(JSON.stringify(this.MazeGrid)));
        // console.log((JSON.stringify(this.MazeGrid)));
    };
    Maze.prototype.fillMazeRandom = function () {
        // initialize the cellsList and add the first cell to the list
        this.CellsList.push(new Cell(0, this.getRandomIntInclusive(0, this.gridHeight - 1), this.getRandomIntInclusive(0, this.gridWidth - 1)));
        var index = -1;
        while (this.CellsList.length > 0) {
            // index is the newest
            index = this.CellsList.length - 1;
            var currentCell = this.CellsList[index];
            var directions = this.getRandomDirections();
            for (var i = 0; i < directions.length; i++) {
                var nextCell = this.directionModifier(this.CellsList[index], directions[i]);
                if (this.isEmptyCell(nextCell.Z, nextCell.Y, nextCell.X)) {
                    // we found a workable direction
                    var result = this.carvePathBetweenCells(currentCell, nextCell, directions[i]);
                    this.MazeGrid[currentCell.Z][currentCell.Y][currentCell.X] = result.current;
                    this.MazeGrid[nextCell.Z][nextCell.Y][nextCell.X] = result.next;
                    this.CellsList.push(nextCell);
                    index = -1;
                    break;
                }
            }
            if (index !== -1)
                this.CellsList.splice(index, 1);
        }
    };
    Maze.prototype.generateGrid = function () {
        var tempGrid = new Array(this.GridLayers);
        for (var i = 0; i < this.GridLayers; i++) {
            tempGrid[i] = new Array(this.GridHeight);
            for (var j = 0; j < this.GridHeight; j++) {
                tempGrid[i][j] = new Array(this.GridWidth);
                tempGrid[i][j].fill();
            }
        }
        return tempGrid;
    };
    Maze.prototype.carvePathBetweenCells = function (currentCell, nextCell, direction) {
        switch (direction) {
            case this.North:
                currentCell.North = true;
                nextCell.South = true;
                break;
            case this.East:
                currentCell.East = true;
                nextCell.West = true;
                break;
            case this.South:
                currentCell.South = true;
                nextCell.North = true;
                break;
            case this.West:
                currentCell.West = true;
                nextCell.East = true;
                break;
            case this.Up:
                currentCell.Up = true;
                nextCell.Down = true;
                break;
            case this.Down:
                currentCell.Down = true;
                nextCell.Up = true;
                break;
        }
        return { current: currentCell, next: nextCell };
    };
    Maze.prototype.getRandomIntInclusive = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
        // The maximum is inclusive and the minimum is inclusive
    };
    Maze.prototype.getRandomDirections = function () {
        return this.shuffle([
            this.North,
            this.South,
            this.West,
            this.East,
            this.Up,
            this.Down,
        ]);
    };
    /**
     * Shuffles array in place.
     * @param {Array} array items An array containing the items.
     */
    Maze.prototype.shuffle = function (array) {
        var j;
        var x;
        var i;
        for (i = array.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = array[i];
            array[i] = array[j];
            array[j] = x;
        }
        return array;
    };
    Maze.prototype.isEmptyCell = function (z, y, x) {
        if (z >= 0 && z < this.GridLayers
            && y >= 0 && y < this.GridHeight
            && x >= 0 && x < this.GridWidth
            && (this.MazeGrid[z][y][x] === null || this.MazeGrid[z][y][x] === undefined))
            return true;
        return false;
    };
    Maze.prototype.directionModifier = function (cell, direction) {
        switch (direction) {
            case this.North:
                return new Cell(cell.Z, cell.Y - 1, cell.X);
            case this.East:
                return new Cell(cell.Z, cell.Y, cell.X + 1);
            case this.South:
                return new Cell(cell.Z, cell.Y + 1, cell.X);
            case this.West:
                return new Cell(cell.Z, cell.Y, cell.X - 1);
            case this.Up:
                // if we're at the top layer, loop around
                if (cell.Z === this.gridLayers - 1)
                    return new Cell(0, cell.Y, cell.X);
                else
                    return new Cell(cell.Z + 1, cell.Y, cell.X);
            case this.Down:
                // if we're at the bottom layer, loop around
                if (cell.Z === 0)
                    return new Cell(this.GridLayers - 1, cell.Y, cell.X);
                else
                    return new Cell(cell.Z - 1, cell.Y, cell.X);
        }
        return new Cell(cell.Z, cell.Y, cell.Z);
    };
    return Maze;
}());
var MazeView = /** @class */ (function () {
    function MazeView(mazegrid, endCell) {
        this.mazegrid = mazegrid;
        this.endCell = endCell;
        this.MazeGrid = mazegrid;
        this.GridWidth = mazegrid[0][0].length;
        this.EndCell = endCell;
    }
    MazeView.prototype.displayMaze = function () {
        $(".new-button").hide();
        $(".desc").show();
        $(".gameButtons").show();
        $(".gameButtons").show();
        $(".MazeHeader").show();
        var html = "";
        for (var layer = 0; layer < this.MazeGrid.length; layer++) {
            var layerName = this.getNameFromLayer(layer);
            html += "<div id=\"layer" + layer + "\" class=\"" + layerName + "\">";
            html += "<h3 class=\"" + layerName + " mazeHeader\">"
                + "<button onclick=\"goDown()\" class=\"down-button\">&nbsp;</button>"
                + ("<span class=\"layer-name\">" + layerName + "</span>")
                + "<button onclick=\"goUp()\" class=\"up-button\">&nbsp;</button>"
                + "</h3>";
            html += "<table id=\"layer" + layer + "-table class=\"" + layerName + "\">";
            for (var row = 0; row < this.MazeGrid[layer].length; row++) {
                html += "<tr class='r'>";
                for (var column = 0; column < this.GridWidth; column++) {
                    var classes = this.getClassesFromCell(this.MazeGrid[layer][row][column]);
                    html += "<td class=\"cell " + classes + " " + layerName + " y" + row + "x" + column + "\">&nbsp;";
                    html += "</td>";
                }
                html += "</tr> <!-- end row -->\n";
            }
            html += "</table>";
            html += "</div>";
        }
        $("#maze-game").html(html);
    };
    MazeView.prototype.getClassesFromCell = function (cell) {
        var classes = "";
        if (!cell.North)
            classes += " top ";
        if (!cell.East)
            classes += " right ";
        if (!cell.South)
            classes += " bottom ";
        if (!cell.West)
            classes += " left ";
        if (!cell.Up)
            classes += " up ";
        if (!cell.Down)
            classes += " down ";
        if (this.MazeGrid[cell.Z][cell.Y][cell.X] === this.EndCell)
            classes += " end ";
        return classes;
    };
    MazeView.prototype.getNameFromLayer = function (layer) {
        switch (layer) {
            case 0:
                return "winter";
            case 1:
                return "spring";
            case 2:
                return "summer";
            case 3:
                return "fall";
            default:
                return "";
        }
    };
    return MazeView;
}());
var currentLayer;
var GridLayers;
var GridHeight;
var GridWidth;
var MyCharacter;
function main() {
    currentLayer = 0;
    GridLayers = 4;
    GridHeight = 8;
    GridWidth = 8;
    var myMaze = new Maze(GridLayers, GridHeight, GridWidth);
    var mazeViewer = new MazeView(myMaze.MazeGrid, myMaze.EndCell);
    mazeViewer.displayMaze();
    console.table(myMaze.MazeGrid[0][0]);
    showLayerHideOthers(currentLayer);
    MyCharacter = new Character("pinkdude", "pink", myMaze.MazeGrid[0][0][0], myMaze.MazeGrid, myMaze.EndCell);
}
https: //stackoverflow.com/questions/1402698/binding-arrow-keys-in-js-jquery
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
        case 49: // 1
            goDown();
            break;
        case 50: // 1
            goUp();
            break;
        case 191:
        case 16:
            showHelp();
            break;
        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});
function showHelp() {
}
function showLayerHideOthers(layerChoice) {
    if (GridLayers > 1) {
        for (var layer = 0; layer < GridLayers; layer++) {
            var layerId = "#layer" + layer;
            if (layer === layerChoice)
                $(layerId).show();
            else
                $(layerId).hide();
        }
    }
}
function goNorth() {
    MyCharacter.move(MyCharacter.North);
}
function goEast() {
    MyCharacter.move(MyCharacter.East);
}
function goSouth() {
    MyCharacter.move(MyCharacter.South);
}
function goWest() {
    MyCharacter.move(MyCharacter.West);
}
function goUp() {
    if (currentLayer < GridLayers - 1)
        currentLayer++;
    else
        currentLayer = 0;
    showLayerHideOthers(currentLayer);
    MyCharacter.move(MyCharacter.Up);
}
function goDown() {
    if (currentLayer === 0)
        currentLayer = GridLayers - 1;
    else
        currentLayer--;
    showLayerHideOthers(currentLayer);
    MyCharacter.move(MyCharacter.Down);
}
