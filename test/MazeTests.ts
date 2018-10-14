import { expect } from 'chai';
import { Maze } from '../src';

describe('Stack', () => {
    it('can be initialized without an initializer', () => {
        const s = new Stack<number>();
        expect(s.size()).to.equal(0);
    });
    it('can be initialized with an initializer', () => {
        const s = new Stack<number>([ 1, 2, 3, 4 ]);
        expect(s.size()).to.equal(4);
    });
    it('can be pushed upon', () => {
        const s = new Stack<number>([ 1, 2, 3, 4 ]);
        s.push(5);
        expect(s.size()).to.equal(5);
        expect(s.peek()).to.equal(5);
    });
    it('can be popped', () => {
        const s = new Stack<number>([ 1, 2, 3, 4 ]);
        expect(s.pop()).to.equal(4);
        expect(s.size()).to.equal(3);
    });
    it('can be peeked', () => {
        const s = new Stack<number>([ 1, 2, 3, 4 ]);
        expect(s.peek()).to.equal(4);
        expect(s.size()).to.equal(4);
    });
    it('isEmpty() returns true when empty', () => {
        const s = new Stack<number>();
        expect(s.isEmpty()).to.be.true;
    });
    it('isEmpty() is false when not empty', () => {
        const s = new Stack<number>([1, 2, 3, 41]);
        expect(s.isEmpty()).to.be.false;
    });
    it('cannot pop when no elements', () => {
        const s = new Stack<number>();
        expect(s.pop()).to.be.undefined;
    });
    it('cannot peek when empty', () => {
        const s = new Stack<number>();
        expect(s.peek()).to.be.undefined;
    });
});