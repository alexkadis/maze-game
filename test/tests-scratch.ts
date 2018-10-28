// let chai = require('chai');
// import { expect } from 'chai';
// import 'mocha';
// var Mocha = require('mocha');
// var assert = require('assert');
// var mocha = new Mocha({});

// // import { Cell } from '../src/Cell';
// // import { aMaze } from '../src/Maze';;
// export { Maze } from "../src/Maze";


// describe('Maze Test Suite', function () {

//	 it('should return a cell x-1 of the current location (1 cell to the south)', function () {

//		 let myMaze = new Maze(4, 8, 8);

//		 // let myCell = aCell.constructor(0,0,0);

//		 // const result =  myMaze.directionModifier(myCell,"South");

//		 // assert.deepEqual(result, aCell.constructor(0,1,0));

//	 });
// });
// // };


// // let chai = require('chai'), path = require('path');
// // import { expect } from 'chai';
// // var assert = require('assert');

// // let myCell = require('../src/Cell.js');
// // let mz = require('../src/Maze.js');
// // // let myMaze = mz.constructor(4, 8, 8);

// // describe('Maze Test Suite', function ()  {
	
// // 	var InstanceOfMaze; 
	
// // 	beforeEach(() => {
// //		 InstanceOfMaze = new mz.Maze(4, 8, 8);
// // 	});
	
// // 	it('should return a cell x-1 of the current location (1 cell to the south)', function () {

// // 		myCell.constructor(0,1,0);
		
// // 		const result =  InstanceOfMaze.directionModifier(myCell.constructor(0, 0, 0),"South");
// // 		expect(result).to.equal(myCell.constructor(0,1,0));
		
// // 	});
	
// // });


// // // chai.should();

// // // import { Cell } from '../src/Cell';
// // // import { Maze } from '../src/Maze';;
// // // import { MazeView } from '../src/MazeView';
// // // import { Character } from '../src/Character';
// // // import { suite, test, slow, timeout } from "mocha-typescript";

// // // import System = require('commonjs');

// // // import { hello } from './hello-world'



// // // var myCell = require('../src/Cell');


// // // @suite("Maze Test Suite")
// // // class myTests extends Maze {

// // // 	constructor () {
// // // 		super (4, 8, 8);
// // // 	}
	

	
// // // 	// @test "returncorrect"() {
		
// // // 	// 	const result = this.directionModifier(new Cell(0, 0, 0),"South");
// // // 	// 	assert.deepEqual(result, new Cell(0,1,0));
// // // 	// } 

// // // 	// @test "will fail"() {
// // // 	// 	assert.fail(0, -1);
// // // 	// }
	
// // // }


// // // describe('Rectangle', () => {
// // // 	describe('#width', () => {
// // // 	  let rectangle;
  
// // // 	  beforeEach(() => {
// // // 		// Create a new Rectangle object before every test.
// // // 		rectangle = new Cell(10, 20);
// // // 	  });
  
// // // 	  it('returns the width', () => {
// // // 		// This will fail if "rectangle.width" does
// // // 		// not equal 10.
// // // 		rectangle.width.should.equal(10);
// // // 	  });
  
// // // 	  it('can be changed', () => {
// // // 		// Assert that the width can be changed.
// // // 		rectangle.width = 30;
// // // 		rectangle.width.should.equal(30);
// // // 	  });
  
// // // 	  it('only accepts numerical values', () => {
// // // 		// Assert that an error will be thrown if
// // // 		// the width it set to a non-numerical value.
// // // 		() => {
// // // 		  rectangle.width = 'foo';
// // // 		}.should.throw(Error);
// // // 	  });
// // // 	});




// // // describe('Stack', () => {
// // //	 it('can be initialized without an initializer', () => {
// // //		 const s = new Stack<number>();
// // //		 expect(s.size()).to.equal(0);
// // //	 });
// // //	 it('can be initialized with an initializer', () => {
// // //		 const s = new Stack<number>([ 1, 2, 3, 4 ]);
// // //		 expect(s.size()).to.equal(4);
// // //	 });
// // //	 it('can be pushed upon', () => {
// // //		 const s = new Stack<number>([ 1, 2, 3, 4 ]);
// // //		 s.push(5);
// // //		 expect(s.size()).to.equal(5);
// // //		 expect(s.peek()).to.equal(5);
// // //	 });
// // //	 it('can be popped', () => {
// // //		 const s = new Stack<number>([ 1, 2, 3, 4 ]);
// // //		 expect(s.pop()).to.equal(4);
// // //		 expect(s.size()).to.equal(3);
// // //	 });
// // //	 it('can be peeked', () => {
// // //		 const s = new Stack<number>([ 1, 2, 3, 4 ]);
// // //		 expect(s.peek()).to.equal(4);
// // //		 expect(s.size()).to.equal(4);
// // //	 });
// // //	 it('isEmpty() returns true when empty', () => {
// // //		 const s = new Stack<number>();
// // //		 expect(s.isEmpty()).to.be.true;
// // //	 });
// // //	 it('isEmpty() is false when not empty', () => {
// // //		 const s = new Stack<number>([1, 2, 3, 41]);
// // //		 expect(s.isEmpty()).to.be.false;
// // //	 });
// // //	 it('cannot pop when no elements', () => {
// // //		 const s = new Stack<number>();
// // //		 expect(s.pop()).to.be.undefined;
// // //	 });
// // //	 it('cannot peek when empty', () => {
// // //		 const s = new Stack<number>();
// // //		 expect(s.peek()).to.be.undefined;
// // //	 });
// // // });