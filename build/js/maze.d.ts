declare var LZString: {
    compressToEncodedURIComponent: (input: string) => any;
    decompressFromEncodedURIComponent: (input: string) => string | null;
    compress: (uncompressed: string) => any;
    _compress: (uncompressed: string, bitsPerChar: number, getCharFromInt: any) => any;
    decompress: (compressed: string) => string | null;
    _decompress: (length: number, resetValue: number, getNextValue: any) => string | null;
};
interface ICell {
    North: boolean;
    East: boolean;
    South: boolean;
    West: boolean;
    Up: boolean;
    Down: boolean;
    Z: number;
    Y: number;
    X: number;
    [direction: string]: any;
}
declare class Cell implements ICell {
    North: boolean;
    East: boolean;
    South: boolean;
    West: boolean;
    Up: boolean;
    Down: boolean;
    Z: number;
    Y: number;
    X: number;
    [direction: string]: any;
    constructor(z: number, y: number, x: number);
    get(input: string): void;
}
declare class Character {
    endLocation: any;
    Color: string;
    Name: string;
    CurrentLocation: Cell;
    EndLocation: any;
    CharacterIcon: string;
    EndIcon: string;
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
    constructor(name: string, color: string, startingLocation: Cell, mazeGrid: Cell[][][], endLocation: any);
    move(direction: string): void;
}
declare class Maze {
    gridLayers: number;
    gridWidth: number;
    gridHeight: number;
    mazePathCompressed?: string | undefined;
    MazeGrid: Cell[][][];
    EndLocation: any;
    readonly North: string;
    readonly East: string;
    readonly South: string;
    readonly West: string;
    readonly Up: string;
    readonly Down: string;
    readonly Directions: string[];
    readonly Back: string;
    MazePath: string;
    MazePathCompressed: string;
    private CellsList;
    private GridLayers;
    private GridWidth;
    private GridHeight;
    constructor(gridLayers: number, gridWidth: number, gridHeight: number, mazePathCompressed?: string | undefined);
    protected getEndLocation(str: string): void;
    protected fillMazeProcedural(): void;
    protected encodeMaze(direction: string): void;
    protected fillMazeRandom(): void;
    protected generateGrid(): any[];
    protected carvePathBetweenCells(currentCell: Cell, nextCell: Cell, direction: string): {
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
    private directionModifier;
}
declare class MazeView {
    mazegrid: Cell[][][];
    endCell: Cell;
    MazeGrid: Cell[][][];
    EndCell: Cell;
    private GridWidth;
    constructor(mazegrid: Cell[][][], endCell: Cell);
    displayMaze(): void;
    private getClassesFromCell;
    private getNameFromLayer;
}
declare let currentLayer: number;
declare let GridLayers: number;
declare let GridHeight: number;
declare let GridWidth: number;
declare let MyCharacter: Character;
declare function main(): void;
declare function showHelp(): void;
declare function showLayerHideOthers(layerChoice: number): void;
declare function goNorth(): void;
declare function goEast(): void;
declare function goSouth(): void;
declare function goWest(): void;
declare function goUp(): void;
declare function goDown(): void;
//# sourceMappingURL=maze.d.ts.map