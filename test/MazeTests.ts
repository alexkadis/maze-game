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

	let InstanceOfMaze: Maze;
	let StartingCell: Cell;
	let NextCell: Cell;
	
	beforeEach(() => {
		InstanceOfMaze = new Maze(4, 8, 8);
		StartingCell = new Cell(0, 0, 0);
		NextCell = new Cell(0, 1, 0);
	});

	it('Should return a cell x-1 of the current location (1 cell to the south).', function () {
		const result: Cell = InstanceOfMaze.directionModifier(StartingCell, "South");
		assert.deepEqual(result, NextCell);

	});

	it('Path carved between cells properly.', function () {
		const resultArray: any = InstanceOfMaze.getReverseDirection(StartingCell, NextCell, "South");
		
		let directedStartingCell = StartingCell;
		directedStartingCell.South = true; 
		let directedNextCell = NextCell;
		directedNextCell.North = true;

		assert.deepEqual(resultArray['current'], directedStartingCell);
		assert.deepEqual(resultArray['next'], directedNextCell);
	});

});
