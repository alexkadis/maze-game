import { expect } from 'chai';
import 'mocha';
var concat = require('concat')
var assert = require('assert');
concat([
	"./src/ts/lz-string.ts",
	"./src/ts/Utils.ts",
	"./src/ts/Cell.ts",
	"./src/ts/Character.ts",
	"./src/ts/CharacterView.ts",
	"./src/ts/MazeNavigator.ts",
	"./src/ts/Maze.ts",
	"./src/ts/MazeView.ts"], './test/testable.ts');
import { Utils } from '../test/testable';
import { Cell } from '../test/testable';
import { MazeNavigator } from '../test/testable';
import { Maze } from '../test/testable';


describe('Maze Test Suite', function () {

	let InstanceOfMaze: Maze;
	let StartingCell: Cell;
	let NextCell: Cell;
	let Util: Utils;
	
	beforeEach(() => {
		InstanceOfMaze = new Maze(4, 10, 10);
		StartingCell = new Cell(0, 0, 0);
		NextCell = new Cell(0, 1, 0);
		Util = new Utils();
	});

	it('Should return a cell x-1 of the current location (1 cell to the south).', function () {
		const result = InstanceOfMaze.directionModifier(StartingCell, "South");
		assert.deepEqual(result, NextCell);

	});

	it('Path carved between cells properly.', function () {
		
		// const resultArray: any = InstanceOfMaze.directionModifier(StartingCell, "South");
		// let directedStartingCell = StartingCell;
		// directedStartingCell.South = true; 
		// let directedNextCell = NextCell;
		// directedNextCell.North = true;
		// assert.deepEqual(resultArray['current'], directedStartingCell);
		// assert.deepEqual(resultArray['next'], directedNextCell);

	});

	it('compressTemplate compresses a template correctly', function () {
		let compressed: string;

		compressed = Util.compressTemplate(InstanceOfMaze);
		console.log(compressed);

	});

});

