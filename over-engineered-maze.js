var currentLayer;
var MazeGrid;
var GridLayers;
var GridHeight;
var GridWidth;
function main() {
    currentLayer = 0;
    GridLayers = 4;
    GridHeight = 5;
    GridWidth = 5;
    MazeGrid = generateGrid();
    var myMaze = new Maze(GridLayers, GridHeight, GridWidth);
    myMaze.fillMaze();
    myMaze.displayMaze();
    showLayerHideOthers(currentLayer);
}
function generateGrid() {
    var tempGrid = new Array(GridLayers);
    for (var i = 0; i < GridLayers; i++) {
        tempGrid[i] = new Array(GridHeight);
        for (var j = 0; j < GridHeight; j++) {
            tempGrid[i][j] = new Array(GridWidth);
            tempGrid[i][j].fill();
        }
    }
    return tempGrid;
}
function showLayerHideOthers(layerChoice) {
    if (GridLayers > 1) {
        for (var layer = 0; layer < GridLayers; layer++) {
            var layerId = "#layer" + layer;
            if (layer == layerChoice) {
                $(layerId).show();
            }
            else {
                $(layerId).hide();
            }
        }
    }
}
function goUp() {
    if (currentLayer < GridLayers - 1) {
        currentLayer++;
    }
    else {
        currentLayer = 0;
    }
    showLayerHideOthers(currentLayer);
}
function goDown() {
    if (currentLayer == 0) {
        currentLayer = GridLayers - 1;
    }
    else {
        currentLayer--;
    }
    showLayerHideOthers(currentLayer);
}
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
    function Character() {
    }
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
        // create the wall cell, any cell that needs a wall references this one
        this.WallCell = this.createCell(-1, -1, -1, true);
        // create the cells list
        this.CellsList = [this.WallCell];
        this.north = "North";
        this.east = "East";
        this.south = "South";
        this.west = "West";
        this.up = "Up";
        this.down = "Down";
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
                    var result = this.assignCellDirections(currentCell, nextCell, directions[i]);
                    MazeGrid[currentCell.Z][currentCell.Y][currentCell.X] = result.current;
                    MazeGrid[nextCell.Z][nextCell.Y][nextCell.X] = result.next;
                    this.CellsList.push(nextCell);
                    index = -1;
                    break;
                }
                else {
                    // we're facing what should be a wall
                    // let result : any = this.assignCellDirectionToWall(currentCell, directions[i]);
                    // MazeGrid[currentCell.Z][currentCell.Y][currentCell.X] = result.current;
                }
            }
            if (index != -1) {
                this.CellsList.splice(index, 1);
            }
        }
    };
    Maze.prototype.assignCellDirectionToWall = function (currentCell, direction) {
        return this.assignCellDirections(currentCell, this.WallCell, direction);
    };
    Maze.prototype.assignCellDirections = function (currentCell, nextCell, direction) {
        switch (direction) {
            case this.north:
                currentCell.North = nextCell;
                nextCell.South = currentCell;
                break;
            case this.east:
                currentCell.East = nextCell;
                nextCell.West = currentCell;
                break;
            case this.south:
                currentCell.South = nextCell;
                nextCell.North = currentCell;
                break;
            case this.west:
                currentCell.West = nextCell;
                nextCell.East = currentCell;
                break;
            case this.up:
                currentCell.Up = nextCell;
                nextCell.Down = currentCell;
                break;
            case this.down:
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
            this.north,
            this.south,
            this.west,
            this.east,
            this.up,
            this.down
        ]);
    };
    Maze.prototype.isEmptyCell = function (z, y, x) {
        if (z >= 0 && z < this.gridLayers
            && y >= 0 && y < this.gridHeight
            && x >= 0 && x < this.gridWidth) {
            if (MazeGrid[z][y][x] === null || MazeGrid[z][y][x] === undefined)
                return true;
        }
        return false;
    };
    Maze.prototype.directionModifier = function (cell, direction) {
        switch (direction) {
            case this.north:
                return this.createCell(cell.Z, cell.Y - 1, cell.X);
            case this.east:
                return this.createCell(cell.Z, cell.Y, cell.X + 1);
            case this.south:
                return this.createCell(cell.Z, cell.Y + 1, cell.X);
            case this.west:
                return this.createCell(cell.Z, cell.Y, cell.X - 1);
            case this.up:
                // if we're at the top layer, loop around
                if (cell.Z == this.gridLayers - 1)
                    return this.createCell(0, cell.Y, cell.X);
                else
                    return this.createCell(cell.Z + 1, cell.Y, cell.X);
            case this.down:
                // if we're at the bottom layer, loop around
                if (cell.Z == 0)
                    return this.createCell(this.GridLayers - 1, cell.Y, cell.X);
                else
                    return this.createCell(cell.Z - 1, cell.Y, cell.X);
        }
        return this.createCell(cell.Z, cell.Y, cell.Z);
    };
    Maze.prototype.shuffle = function (array) {
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
    };
    Maze.prototype.getClassesFromCell = function (cell) {
        var classes = "";
        if (cell.North == this.WallCell.South)
            classes += " top ";
        if (cell.East == this.WallCell.West)
            classes += " right ";
        if (cell.South == this.WallCell.North)
            classes += " bottom ";
        if (cell.West == this.WallCell.East)
            classes += " left ";
        if (cell.Up != this.WallCell.Down)
            classes += " up ";
        if (cell.Down != this.WallCell.Up)
            classes += " down ";
        return classes;
    };
    Maze.prototype.getNameFromLayer = function (layer) {
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
    Maze.prototype.displayMaze = function () {
        var html = "";
        for (var layer = 0; layer < MazeGrid.length; layer++) {
            var layerName = this.getNameFromLayer(layer);
            html += "<div id=\"layer" + layer + "\" class=\"" + layerName + "\">";
            html += "<h3>Layer " + layerName + "</h3>";
            html += "<table id=\"layer" + layer + "-table class=\"" + layerName + "\">";
            for (var row = 0; row < MazeGrid[layer].length; row++) {
                html += "<tr class='r'>";
                for (var column = 0; column < this.gridWidth; column++) {
                    var classes = this.getClassesFromCell(MazeGrid[layer][row][column]);
                    html += "<td class=\"cell " + classes + " " + layerName + "\">&nbsp;";
                    html += "</td>";
                }
                html += "</tr> <!-- end row -->\n";
            }
            html += "</table>";
            html += "</div>";
        }
        $("#maze-game").html(html);
        console.log(MazeGrid[0]);
    };
    return Maze;
}());
