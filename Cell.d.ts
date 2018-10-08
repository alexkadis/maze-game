declare class Cell {
    North: Cell | null;
    East: Cell | null;
    South: Cell | null;
    West: Cell | null;
    Up: Cell | null;
    Down: Cell | null;
    Z: number;
    Y: number;
    X: number;
    isWall: boolean;
    constructor();
}
