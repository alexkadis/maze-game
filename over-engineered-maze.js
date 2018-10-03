function main() {
    var layers = Number($("#layers").find(":selected").val());
    var myMaze = new Maze(layers, 10, 10);
    myMaze.fillMaze();
    myMaze.displayMaze();
}
var Maze = /** @class */ (function () {
    function Maze(gridLevels, gridWidth, gridHeight) {
        this.gridLevels = gridLevels;
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.GridLevels = gridLevels;
        this.GridWidth = gridWidth;
        this.GridHeight = gridHeight;
        // generate the grid
        this.MazeGrid = this.generateGrid();
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
    Maze.prototype.generateGrid = function () {
        var tempGrid = new Array(this.GridLevels);
        for (var i = 0; i < this.GridLevels; i++) {
            tempGrid[i] = new Array(this.GridHeight);
            for (var j = 0; j < this.GridHeight; j++) {
                tempGrid[i][j] = new Array(this.GridWidth);
                tempGrid[i][j].fill();
            }
        }
        return tempGrid;
    };
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
                    this.MazeGrid[currentCell.Z][currentCell.Y][currentCell.X] = result.current;
                    this.MazeGrid[nextCell.Z][nextCell.Y][nextCell.X] = result.next;
                    this.CellsList.push(nextCell);
                    index = -1;
                    break;
                }
                else {
                    // we're facing what should be a wall
                    // let result : any = this.assignCellDirectionToWall(currentCell, directions[i]);
                    // this.MazeGrid[currentCell.Z][currentCell.Y][currentCell.X] = result.current;
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
        var tempCell = new cell();
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
        if (z >= 0 && z < this.gridLevels
            && y >= 0 && y < this.gridHeight
            && x >= 0 && x < this.gridWidth) {
            if (this.MazeGrid[z][y][x] === null || this.MazeGrid[z][y][x] === undefined)
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
                // if we're at the top level, loop around
                if (cell.Z == this.gridLevels - 1)
                    return this.createCell(0, cell.Y, cell.X);
                else
                    return this.createCell(cell.Z + 1, cell.Y, cell.X);
            case this.down:
                // if we're at the bottom level, loop around
                if (cell.Z == 0)
                    return this.createCell(this.GridLevels - 1, cell.Y, cell.X);
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
        return classes;
    };
    Maze.prototype.displayMaze = function () {
        var html = "";
        for (var level = 0; level < this.MazeGrid.length; level++) {
            html += '<table id="level-' + level + '"><h3>Level #' + level + '</h3>\n';
            for (var row = 0; row < this.MazeGrid[level].length; row++) {
                html += "<tr class='r'>";
                for (var column = 0; column < this.gridWidth; column++) {
                    var classes = this.getClassesFromCell(this.MazeGrid[level][row][column]);
                    html += "<td class=\"b " + classes + "\">&nbsp;";
                    html += "</td>";
                }
                html += "</tr> <!-- end row -->\n";
            }
            html += "</table>";
        }
        $("#maze-game").html(html);
        console.log(this.MazeGrid[0]);
    };
    return Maze;
}());
var cell = /** @class */ (function () {
    function cell() {
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
    return cell;
}());
