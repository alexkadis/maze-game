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
    it('should return a cell x-1 of the current location (1 cell to the south)', function () {
        var InstanceOfMaze = new testable_2.Maze(4, 8, 8);
        var result = InstanceOfMaze.directionModifier(new testable_1.Cell(0, 0, 0), "South");
        assert.deepEqual(result, new testable_1.Cell(0, 1, 0));
    });
});
