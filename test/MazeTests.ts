import { expect } from 'chai';
import 'mocha';
var concat = require('concat')
var assert = require('assert');
concat([
	"./src/Cell.ts",
	"./src/Character.ts",
	"./src/Maze.ts",
	"./src/MazeView.ts",
	"./src/main.ts"], './test/testable.ts');

import { Cell } from '../test/testable';
import { Maze } from '../test/testable';


describe('Maze Test Suite', function () {

	it('should return a cell x-1 of the current location (1 cell to the south)', function () {

		let InstanceOfMaze = new Maze(4, 8, 8);

		const result = InstanceOfMaze.directionModifier(new Cell(0, 0, 0), "South");
		assert.deepEqual(result, new Cell(0, 1, 0));

	});
});
