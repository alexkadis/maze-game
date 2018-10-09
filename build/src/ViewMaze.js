"use strict";
var ViewMaze = /** @class */ (function () {
    function ViewMaze(mazegrid, wallCell) {
        this.mazegrid = mazegrid;
        this.wallCell = wallCell;
        this.MazeGrid = mazegrid;
        this.GridWidth = mazegrid[0][0].length;
        this.WallCell = wallCell;
    }
    ViewMaze.prototype.displayMaze = function () {
        var html = "";
        for (var layer = 0; layer < this.MazeGrid.length; layer++) {
            var layerName = this.getNameFromLayer(layer);
            html += "<div id=\"layer" + layer + "\" class=\"" + layerName + "\">";
            html += "<h3>Layer " + layerName + "</h3>";
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
    ViewMaze.prototype.getClassesFromCell = function (cell) {
        var classes = "";
        console.log(cell);
        if (cell !== undefined) {
            if (cell.North === this.WallCell)
                classes += " top ";
            if (cell.East === this.WallCell)
                classes += " right ";
            if (cell.South === this.WallCell)
                classes += " bottom ";
            if (cell.West === this.WallCell)
                classes += " left ";
            if (cell.Up !== this.WallCell)
                classes += " up ";
            if (cell.Down !== this.WallCell)
                classes += " down ";
        }
        return classes;
    };
    ViewMaze.prototype.getNameFromLayer = function (layer) {
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
    return ViewMaze;
}());
