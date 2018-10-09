declare class ViewMaze {
    mazegrid: Cell[][][];
    wallCell: Cell;
    MazeGrid: Cell[][][];
    private GridWidth;
    private WallCell;
    constructor(mazegrid: Cell[][][], wallCell: Cell);
    displayMaze(): void;
    private getClassesFromCell;
    private getNameFromLayer;
}
