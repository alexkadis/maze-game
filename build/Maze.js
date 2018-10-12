"use strict";
var Cell = /** @class */ (function () {
    function Cell() {
        this.North = null;
        this.East = null;
        this.South = null;
        this.West = null;
        this.Up = null;
        this.Down = null;
        this.Z = -1;
        this.Y = -1;
        this.X = -1;
        this.isWall = false;
    }
    return Cell;
}());
/*
Figure out a way to have a "character" that can move North, South, East, West
    - The character starts at the starting point
    - Character ends at the ending point
    - Character can't move past a wall
*/
var Character = /** @class */ (function () {
    function Character(name, color, startingLocation, mazeGrid, endCell) {
        this.endCell = endCell;
        this.Color = color;
        this.Name = name;
        this.CurrentLocation = startingLocation;
        this.North = "North";
        this.East = "East";
        this.South = "South";
        this.West = "West";
        this.Up = "Up";
        this.Down = "Down";
        this.MazeGrid = mazeGrid;
        this.GridLayers = this.MazeGrid.length;
        this.EndCell = endCell;
        this.CharacterIcon = "😀";
        this.EndIcon = "🏁";
        this.move("");
    }
    Character.prototype.move = function (direction) {
        $(".y" + this.CurrentLocation.Y + "x" + this.CurrentLocation.X).text("");
        $(".y" + this.CurrentLocation.Y + "x" + this.CurrentLocation.X).removeClass(this.Name);
        // console.log(`OLD Location: Z:${this.CurrentLocation.Z} y:${this.CurrentLocation.Y} x:${this.CurrentLocation.X}`);
        switch (direction) {
            case this.North:
                if (this.CurrentLocation.North != null)
                    this.CurrentLocation = this.CurrentLocation.North;
                break;
            case this.East:
                if (this.CurrentLocation.East != null)
                    this.CurrentLocation = this.CurrentLocation.East;
                break;
            case this.South:
                if (this.CurrentLocation.South != null)
                    this.CurrentLocation = this.CurrentLocation.South;
                break;
            case this.West:
                if (this.CurrentLocation.West != null)
                    this.CurrentLocation = this.CurrentLocation.West;
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
        if (this.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y][this.CurrentLocation.X] == this.EndCell) {
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
        // console.log(`New Location: Z:${this.CurrentLocation.Z} y:${this.CurrentLocation.Y} x:${this.CurrentLocation.X}`);
        $(".y" + this.CurrentLocation.Y + "x" + this.CurrentLocation.X).addClass(this.Name);
    };
    return Character;
}());
var Maze = /** @class */ (function () {
    function Maze(gridLayers, gridWidth, gridHeight) {
        this.gridLayers = gridLayers;
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.GridLayers = gridLayers;
        this.GridWidth = gridWidth;
        this.GridHeight = gridHeight;
        // generate the grid
        this.MazeGrid = this.generateGrid();
        // create the wall cell, any cell that needs a wall references this one
        this.WallCell = this.createCell(-1, -1, -1, true);
        // create the cells list
        this.CellsList = [this.WallCell];
        this.North = "North";
        this.East = "East";
        this.South = "South";
        this.West = "West";
        this.Up = "Up";
        this.Down = "Down";
        this.EndCell = new Cell();
    }
    Maze.prototype.fillMaze = function () {
        // initialize the cellsList and add the first cell to the list
        this.CellsList.push(this.createCell(0, this.getRandomIntInclusive(0, this.gridHeight - 1), this.getRandomIntInclusive(0, this.gridWidth - 1)));
        var index = -1;
        while (this.CellsList.length > 0) {
            // index is the newest
            index = this.CellsList.length - 1;
            // random index (something about this fails)
            // let index = this.getRandomIntInclusive(0, this.cellsList.length);
            var currentCell = this.CellsList[index];
            // console.log(currentCell);
            var directions = this.getRandomDirections();
            for (var i = 0; i < directions.length; i++) {
                var nextCell = this.directionModifier(this.CellsList[index], directions[i]);
                if (this.isEmptyCell(nextCell.Z, nextCell.Y, nextCell.X)) {
                    // console.log(directions[i]);
                    // we found a workable direction
                    var result = this.getReverseDirection(currentCell, nextCell, directions[i]);
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
        this.EndCell = this.MazeGrid[0][this.getRandomIntInclusive(1, this.gridHeight - 1)][this.getRandomIntInclusive(1, this.gridWidth - 1)];
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
    Maze.prototype.getReverseDirection = function (currentCell, nextCell, direction) {
        switch (direction) {
            case this.North:
                currentCell.North = nextCell;
                nextCell.South = currentCell;
                break;
            case this.East:
                currentCell.East = nextCell;
                nextCell.West = currentCell;
                break;
            case this.South:
                currentCell.South = nextCell;
                nextCell.North = currentCell;
                break;
            case this.West:
                currentCell.West = nextCell;
                nextCell.East = currentCell;
                break;
            case this.Up:
                currentCell.Up = nextCell;
                nextCell.Down = currentCell;
                break;
            case this.Down:
                currentCell.Down = nextCell;
                nextCell.Up = currentCell;
                break;
        }
        return { current: currentCell, next: nextCell };
    };
    Maze.prototype.createCell = function (z, y, x, isWall) {
        if (isWall === void 0) { isWall = false; }
        var tempCell = new Cell();
        tempCell.Z = z;
        tempCell.Y = y;
        tempCell.X = x;
        tempCell.isWall = isWall;
        return tempCell;
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
                return this.createCell(cell.Z, cell.Y - 1, cell.X);
            case this.East:
                return this.createCell(cell.Z, cell.Y, cell.X + 1);
            case this.South:
                return this.createCell(cell.Z, cell.Y + 1, cell.X);
            case this.West:
                return this.createCell(cell.Z, cell.Y, cell.X - 1);
            case this.Up:
                // if we're at the top layer, loop around
                if (cell.Z === this.gridLayers - 1)
                    return this.createCell(0, cell.Y, cell.X);
                else
                    return this.createCell(cell.Z + 1, cell.Y, cell.X);
            case this.Down:
                // if we're at the bottom layer, loop around
                if (cell.Z === 0)
                    return this.createCell(this.GridLayers - 1, cell.Y, cell.X);
                else
                    return this.createCell(cell.Z - 1, cell.Y, cell.X);
        }
        return this.createCell(cell.Z, cell.Y, cell.Z);
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
    return Maze;
}());
var MazeView = /** @class */ (function () {
    function MazeView(mazegrid, wallCell, endCell) {
        this.mazegrid = mazegrid;
        this.wallCell = wallCell;
        this.endCell = endCell;
        this.MazeGrid = mazegrid;
        this.GridWidth = mazegrid[0][0].length;
        this.WallCell = wallCell;
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
            html += "<h3 class=\"" + layerName + " mazeHeader\"><button onclick=\"goDown()\" class=\"down-button\">&nbsp;</button> <span class=\"layer-name\">" + layerName + "</span> <button onclick=\"goUp()\" class=\"up-button\">&nbsp;</button></h3>";
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
        console.log(this.MazeGrid[0]);
    };
    MazeView.prototype.getClassesFromCell = function (cell) {
        var classes = "";
        if (cell.North === this.WallCell.South)
            classes += " top ";
        if (cell.East === this.WallCell.West)
            classes += " right ";
        if (cell.South === this.WallCell.North)
            classes += " bottom ";
        if (cell.West === this.WallCell.East)
            classes += " left ";
        if (cell.Up !== this.WallCell.Down)
            classes += " up ";
        if (cell.Down !== this.WallCell.Up)
            classes += " down ";
        if (this.MazeGrid[cell.Z][cell.Y][cell.X] == this.EndCell)
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
    myMaze.fillMaze();
    var mazeViewer = new MazeView(myMaze.MazeGrid, myMaze.WallCell, myMaze.EndCell);
    mazeViewer.displayMaze();
    showLayerHideOthers(currentLayer);
    MyCharacter = new Character("pinkdude", "pink", myMaze.MazeGrid[0][0][0], myMaze.MazeGrid, myMaze.EndCell);
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
    // console.log(MyCharacter.CurrentLocation);
}
function goEast() {
    MyCharacter.move(MyCharacter.East);
    // console.log(MyCharacter.CurrentLocation);
}
function goSouth() {
    MyCharacter.move(MyCharacter.South);
    // console.log(MyCharacter.CurrentLocation);
}
function goWest() {
    MyCharacter.move(MyCharacter.West);
    // console.log(MyCharacter.CurrentLocation);
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
    // console.log(MyCharacter.CurrentLocation);
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
    // console.log(MyCharacter.CurrentLocation);
}
