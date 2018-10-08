declare class Maze {
    gridLayers: number;
    gridWidth: number;
    gridHeight: number;
    MazeGrid: Cell[][][];
    private CellsList;
    private WallCell;
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
    displayMaze(): void;
    private generateGrid;
    private assignCellDirections;
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
    private getClassesFromCell;
    private getNameFromLayer;
}
