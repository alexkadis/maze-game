declare class Character {
    Color: string;
    Name: string;
    CurrentLocation: Cell;
    North: string;
    East: string;
    South: string;
    West: string;
    Up: string;
    Down: string;
    private GridLayers;
    private MazeGrid;
    constructor(name: string, color: string, startingLocation: Cell, mazeGrid: Cell[][][]);
    move(direction: string): void;
}
