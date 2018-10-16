declare class Character {
    endCell: Cell;
    Color: string;
    Name: string;
    CurrentLocation: Cell;
    readonly North: string;
    readonly East: string;
    readonly South: string;
    readonly West: string;
    readonly Up: string;
    readonly Down: string;
    private GridLayers;
    private GridWidth;
    private GridHeight;
    private MazeGrid;
    EndCell: Cell;
    CharacterIcon: string;
    EndIcon: string;
    constructor(name: string, color: string, startingLocation: Cell, mazeGrid: Cell[][][], endCell: Cell);
    move(direction: string): void;
}
//# sourceMappingURL=Character.d.ts.map