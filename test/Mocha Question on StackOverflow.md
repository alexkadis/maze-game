# Using TypeScript, Mocha, and Chai without Modules

I'm using TypeScript and trying to do so without creating any modules (i.e. no `export` statements). Using modules would require using SystemJS or AMD and I'm trying to keep my project as simple as possible.

I'd like to create unit tests, and it seems like Mocha/Chai is the most popular way to do that.

I have 3 files:
    // ../src/Cell.ts
    class Cell {
        public Z: number;
        public Y: number;
        public X: number;

        constructor (z: number, y: number, x: number) {
            this.Z = z;
            this.Y = y;
            this.X = x;
        }
    }

    // ../src/Maze.ts
    class Maze {
        public myCell: Cell;
        private width: number;

        constructor (width: number) {
            this.myCell = new Cell(-1, -1, -1);
        }

        protected directionModifier(cell: Cell, direction: string) {
            // does something
        }
    }

    // ../test/MazeTests.ts
    let chai = require('chai');
    import { expect } from 'chai';
    var assert = require('assert');
    var mocha = new Mocha();
    mocha.addFile('../src/Cell.ts');
    mocha.addFile('../src/Maze.ts');

    describe('Maze Test Suite', function ()  {

        it('should return a cell x-1 of the current location (1 cell to the south)', function () {
            
            let myMaze = new Maze(4, 8, 8);
            let myCell = new Cell(0,0,0);
            
            const result =  myMaze.directionModifier(myCell,"South");
            
            assert.deepEqual(result, new Cell(0,1,0));

        });
    });


I get a few errors when I run `npm test`:


    test/MazeTests.ts(42,20): error TS2304: Cannot find name 'Maze'.
    test/MazeTests.ts(43,20): error TS2304: Cannot find name 'Cell'.
    test/MazeTests.ts(47,38): error TS2304: Cannot find name 'Cell'.



There's a distinct possibility I'm missing something obvious.