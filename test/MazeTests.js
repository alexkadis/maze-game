"use strict";
exports.__esModule = true;
/// <reference path="../build/maze.d.ts"/>
var chai_1 = require("chai");
///
// import { Cell } from '../src/Cell';
// import { Maze } from '../src/Maze';;
// import { MazeView } from '../src/MazeView';
// import { Character } from '../src/Character';
// // import { suite, test, slow, timeout } from "mocha-typescript";
// import System = require('commonjs');
// import { hello } from './hello-world'
require("mocha");
var assert = require('assert');
// @suite("Maze Test Suite")
// class myTests extends Maze {
// 	constructor () {
// 		super (4, 8, 8);
// 	}
// 	@test "returncorrect"() {
// 		const result = this.directionModifier(new Cell(0, 0, 0),"South");
// 		assert.deepEqual(result, new Cell(0,1,0));
// 	} 
// 	@test "will fail"() {
// 		assert.fail(0, -1);
// 	}
// }
describe('Maze Test Suite', function () {
    it('should return a cell x-1 of the current location (1 cell to the south)', function () {
        var result = this.directionModifier(new Cell(0, 0, 0), "South");
        chai_1.expect(result).to.equal(new Cell(0, 1, 0));
    });
});
// describe('Stack', () => {
//     it('can be initialized without an initializer', () => {
//         const s = new Stack<number>();
//         expect(s.size()).to.equal(0);
//     });
//     it('can be initialized with an initializer', () => {
//         const s = new Stack<number>([ 1, 2, 3, 4 ]);
//         expect(s.size()).to.equal(4);
//     });
//     it('can be pushed upon', () => {
//         const s = new Stack<number>([ 1, 2, 3, 4 ]);
//         s.push(5);
//         expect(s.size()).to.equal(5);
//         expect(s.peek()).to.equal(5);
//     });
//     it('can be popped', () => {
//         const s = new Stack<number>([ 1, 2, 3, 4 ]);
//         expect(s.pop()).to.equal(4);
//         expect(s.size()).to.equal(3);
//     });
//     it('can be peeked', () => {
//         const s = new Stack<number>([ 1, 2, 3, 4 ]);
//         expect(s.peek()).to.equal(4);
//         expect(s.size()).to.equal(4);
//     });
//     it('isEmpty() returns true when empty', () => {
//         const s = new Stack<number>();
//         expect(s.isEmpty()).to.be.true;
//     });
//     it('isEmpty() is false when not empty', () => {
//         const s = new Stack<number>([1, 2, 3, 41]);
//         expect(s.isEmpty()).to.be.false;
//     });
//     it('cannot pop when no elements', () => {
//         const s = new Stack<number>();
//         expect(s.pop()).to.be.undefined;
//     });
//     it('cannot peek when empty', () => {
//         const s = new Stack<number>();
//         expect(s.peek()).to.be.undefined;
//     });
// });
