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
    /**
     * Given a decompressed template, return a path, start, and end
     * @param template the decompressed template to break apart
     */
    uncompressTemplate(template: any): any;
    compressionTest(MyMaze: Maze): void;
    b64EncodeUnicode(str: string): string;
    compressTemplate(myMaze: Maze): any;
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
    [direction: string]: any;
    constructor(z: number, y: number, x: number);
}
declare class Character {
    Name: string;
    CurrentLocation: any;
    PreviousLocation: any;
    ThisMaze: Maze;
    private Utilities;
    constructor(name: string, myMaze: Maze);
    /**
     * If the direction parameter is valid, change the current location to that cell
     * @param direction Direction to move the character
     */
    move(direction: string): boolean;
    ResetCharacter(): void;
    /**
     * Moves the character to an *exact* location within the grid
     * @param z Z-Axis
     * @param y Y-Axis
     * @param x X-Axis
     */
    SetExactLocation(z: number | null, y: number | null, x: number | null): void;
    /**
     * Moves the character to a location relative to the current location within the grid
     * @param z Z-Axis
     * @param y Y-Axis
     * @param x X-Axis
     */
    SetRelativeLocation(z: number, y: number, x: number): void;
    /**
     * Checks to see if a character can move a direction
     * @param direction The direction the character wants to move
     */
    CanMoveDirection(direction: string): boolean | undefined;
}
interface ICharacterView {
    MyCharacter: Character;
    CharacterIcon: string;
    SolvedCharacterIcon: string;
    CurrentCharacterIcon: string;
    EndIcon: string;
    SolvedEndIcon: string;
    CurrentEndIcon: string;
    move(): any;
}
declare class HTMLCharacterView implements ICharacterView {
    MyCharacter: Character;
    CharacterIcon: string;
    SolvedCharacterIcon: string;
    EndIcon: string;
    SolvedEndIcon: string;
    CurrentCharacterIcon: string;
    CurrentEndIcon: string;
    constructor(myCharacter: Character, characterIcon: string, solvedCharacterEndIcon: string, mazeEndIcon: string, solvedMazeEndIcon: string);
    move(): void;
    private IsSolved;
}
declare class Maze {
    StartLocation: any;
    EndLocation: any;
    GridLayers: number;
    GridWidth: number;
    GridHeight: number;
    MazeGrid: Cell[][][];
    MazePath: string;
    MazeTemplateCompressed: string;
    MazeDifficulty: number;
    BestPath: string;
    private Utilities;
    private MazeSolved;
    constructor(gridLayers: number, gridWidth: number, gridHeight: number, mazeTemplateCompressed?: string, startLocation?: any, endLocation?: any);
    SetMazeSolvedToFalse(): void;
    IsMazeSolved(currentLocation: any): boolean;
    determineMazeDifficulty(attempts?: number): void;
    private generateGrid;
    /**
     * Given a decompressed path, returns a maze path for a procedural maze
     * @param mazeTemplateCompressed given decompressed string of directions (a path)
     */
    private fillMazeProcedural;
    /**
     * Returns a maze path for a random maze
     */
    private fillMazeRandom;
    private carvePathBetweenCells;
    private isEmptyCell;
    private isValidCell;
    private directionModifier;
}
declare class MazeView {
    myMaze: Maze;
    private MyMaze;
    constructor(myMaze: Maze);
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
declare let MyMaze: Maze;
declare function main(): void;
declare function testBestPath(): void;
declare function showLayerHideOthers(layerChoice: number): void;
declare function goNorth(): void;
declare function goEast(): void;
declare function goSouth(): void;
declare function goWest(): void;
declare function goUp(): void;
declare function goDown(): void;
declare class MazeNavigator {
    moves: number;
    path: string;
    Character: Character;
    private Utilities;
    private MyMaze;
    constructor(myMaze: Maze);
    Navigate(): void;
    isNavigatablePath(possiblePath: string): boolean;
}
//# sourceMappingURL=maze.d.ts.map