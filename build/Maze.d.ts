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
declare class Character {
    endCell: Cell;
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
    private CellsList;
    WallCell: Cell;
    EndCell: Cell;
    private GridLayers;
    private GridWidth;
    private GridHeight;
    private North;
    private East;
    private South;
    private West;
    private Up;
    private Down;
    constructor(gridLayers: number, gridWidth: number, gridHeight: number);
    fillMaze(): void;
    private generateGrid;
    private getReverseDirection;
    private createCell;
    private getRandomIntInclusive;
    private getRandomDirections;
    private isEmptyCell;
    private directionModifier;
    /**
     * Shuffles array in place.
     * @param {Array} array items An array containing the items.
     */
    shuffle(array: any): any;
}
declare class MazeView {
    mazegrid: Cell[][][];
    wallCell: Cell;
    endCell: Cell;
    MazeGrid: Cell[][][];
    private GridWidth;
    private WallCell;
    EndCell: Cell;
    constructor(mazegrid: Cell[][][], wallCell: Cell, endCell: Cell);
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