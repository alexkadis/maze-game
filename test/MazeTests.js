"use strict";
exports.__esModule = true;
require("mocha");
var concat = require('concat');
var assert = require('assert');
concat([
    "./src/Cell.ts",
    "./src/Character.ts",
    "./src/Maze.ts",
    "./src/MazeView.ts",
    "./src/main.ts"
], './test/testable.ts');
var testable_1 = require("../test/testable");
var testable_2 = require("../test/testable");
describe('Maze Test Suite', function () {
    var InstanceOfMaze;
    var StartingCell;
    var NextCell;
    beforeEach(function () {
        InstanceOfMaze = new testable_2.Maze(4, 8, 8);
        StartingCell = new testable_1.Cell(0, 0, 0);
        NextCell = new testable_1.Cell(0, 1, 0);
    });
    it('should return a cell x-1 of the current location (1 cell to the south)', function () {
        var result = InstanceOfMaze.directionModifier(StartingCell, "South");
        assert.deepEqual(result, NextCell);
    });
    it('path carved between cells properly', function () {
        var resultArray = InstanceOfMaze.getReverseDirection(StartingCell, NextCell, "South");
        var directedStartingCell = StartingCell.South = true;
        var directedNextCell = NextCell.North = true;
        assert.deepEqual(resultArray['current'], directedStartingCell);
        assert.deepEqual(resultArray['nextCell'], directedNextCell);
    });
});
