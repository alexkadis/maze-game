declare class Utils {
    readonly North: string;
    readonly East: string;
    readonly South: string;
    readonly West: string;
    readonly Up: string;
    readonly Down: string;
    readonly Directions: string[];
    readonly Back: string;
    constructor();
    getRandomIntInclusive(min: number, max: number): number;
    getRandomDirections(): any;
    getLocationsFromTemplate(str: string): {
        End: string;
        Path: string;
    };
    getNextActionFromTemplate(template: string[]): string;
    /**
     * Shuffles array in place.
     * @param {Array} array items An array containing the items.
     */
    private shuffle;
}
declare var LZString: {
    compressToEncodedURIComponent: (input: string) => any;
    decompressFromEncodedURIComponent: (input: string) => string;
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
}
declare class Character {
    endLocation: any;
    Name: string;
    CurrentLocation: Cell;
    EndLocation: any;
    private GridLayers;
    private GridWidth;
    private GridHeight;
    private MazeGrid;
    private IsMazeSolved;
    private Utilities;
    constructor(name: string, startingLocation: Cell, mazeGrid: Cell[][][], endLocation: any);
    move(direction?: string): {
        Character: {
            Z: number;
            Y: number;
            X: number;
        };
        End: {
            Z: any;
            Y: any;
            X: any;
        };
        IsMazeSolved: boolean;
    };
}
interface ICharacterView {
    IsMazeSolved: boolean;
    Name: string;
    CharacterIcon: string;
    SolvedCharacterIcon: string;
    CurrentCharacterIcon: string;
    EndIcon: string;
    SolvedEndIcon: string;
    CurrentEndIcon: string;
    CharacterLocation: any;
    EndLocation: any;
    move(newLocations: any): any;
}
declare class HTMLCharacterView implements ICharacterView {
    IsMazeSolved: boolean;
    Name: string;
    CharacterIcon: string;
    SolvedCharacterIcon: string;
    EndIcon: string;
    SolvedEndIcon: string;
    CurrentCharacterIcon: string;
    CurrentEndIcon: string;
    CharacterLocation: any;
    EndLocation: any;
    constructor(name: string, characterIcon: string, solvedCharacterEndIcon: string, mazeEndIcon: string, solvedMazeEndIcon: string);
    setCharacterIcon(): void;
    move(locations: any): void;
}
declare class Maze {
    gridLayers: number;
    gridWidth: number;
    gridHeight: number;
    mazePathCompressed?: string | undefined;
    StartLocation: any;
    EndLocation: any;
    GridLayers: number;
    GridWidth: number;
    GridHeight: number;
    MazeGrid: Cell[][][];
    MazePath: string;
    MazePathCompressed: string;
    private IsMazeSolved;
    private Utilities;
    constructor(gridLayers: number, gridWidth: number, gridHeight: number, mazePathCompressed?: string | undefined);
    generateGrid(): any[];
    protected fillMazeProcedural(decompressedPath: string): any;
    protected fillMazeRandom(): string;
    protected carvePathBetweenCells(currentCell: Cell, nextCell: Cell, direction: string): {
        current: Cell;
        next: Cell;
    };
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
declare let MyCharacterView: ICharacterView;
declare let Utilities: Utils;
declare function main(): void;
declare function showLayerHideOthers(layerChoice: number): void;
declare function goNorth(): void;
declare function goEast(): void;
declare function goSouth(): void;
declare function goWest(): void;
declare function goUp(): void;
declare function goDown(): void;
declare class MazeNavigator {
    private Utilities;
    private Character;
    private MazeGrid;
    constructor(mazeGrid: Cell[][][], endLocation: any);
    navigator(): void;
}
//# sourceMappingURL=maze.d.ts.map