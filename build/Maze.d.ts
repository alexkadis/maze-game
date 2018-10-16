declare class Cell {
    North: boolean;
    East: boolean;
    South: boolean;
    West: boolean;
    Up: boolean;
    Down: boolean;
    Z: number;
    Y: number;
    X: number;
    constructor(z: number, y: number, x: number);
}
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
declare class Maze {
    gridLayers: number;
    gridWidth: number;
    gridHeight: number;
    MazeGrid: Cell[][][];
    EndCell: Cell;
    private CellsList;
    private GridLayers;
    private GridWidth;
    private GridHeight;
    readonly North: string;
    readonly East: string;
    readonly South: string;
    readonly West: string;
    readonly Up: string;
    readonly Down: string;
    constructor(gridLayers: number, gridWidth: number, gridHeight: number);
    fillMaze(): void;
    protected fillMazeProcedural(): void;
    protected encodeMaze(): void;
    protected fillMazeRandom(): void;
    protected generateGrid(): any[];
    protected getReverseDirection(currentCell: Cell, nextCell: Cell, direction: string): {
        current: Cell;
        next: Cell;
    };
    protected getRandomIntInclusive(min: number, max: number): number;
    protected getRandomDirections(): any;
    /**
     * Shuffles array in place.
     * @param {Array} array items An array containing the items.
     */
    protected shuffle(array: any): any;
    protected isEmptyCell(z: number, y: number, x: number): boolean;
    directionModifier(cell: Cell, direction: string): Cell;
}
declare class MazeView {
    mazegrid: Cell[][][];
    endCell: Cell;
    MazeGrid: Cell[][][];
    private GridWidth;
    EndCell: Cell;
    constructor(mazegrid: Cell[][][], endCell: Cell);
    displayMaze(): void;
    private getClassesFromCell;
    private getNameFromLayer;
}
declare var currentLayer: number;
declare var GridLayers: number;
declare var GridHeight: number;
declare var GridWidth: number;
declare var MyCharacter: Character;
declare function main(): void;
declare function showLayerHideOthers(layerChoice: number): void;
declare function goNorth(): void;
declare function goEast(): void;
declare function goSouth(): void;
declare function goWest(): void;
declare function goUp(): void;
declare function goDown(): void;
//# sourceMappingURL=maze.d.ts.map