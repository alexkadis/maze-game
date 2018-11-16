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