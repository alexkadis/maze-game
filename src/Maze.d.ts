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
//# sourceMappingURL=Maze.d.ts.map