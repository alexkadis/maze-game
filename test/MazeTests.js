"use strict";
exports.__esModule = true;
require("mocha");
var mocha = new Mocha({});
var concat = require('concat');
concat([
    "./src/Cell.ts",
    "./src/Character.ts",
    "./src/Maze.ts",
    "./src/MazeView.ts",
    "./src/main.ts"
]);
describe('Maze Test Suite', function () {
    var InstanceOfMaze;
    // beforeEach(() => {
    //     InstanceOfMaze = new mz.Maze(4, 8, 8);
    // });
    // it('should return a cell x-1 of the current location (1 cell to the south)', function () {
    // 	myCell.constructor(0,1,0);
    // 	const result =  InstanceOfMaze.directionModifier(myCell.constructor(0, 0, 0),"South");
    // 	expect(result).to.equal(myCell.constructor(0,1,0));
    // });
});
