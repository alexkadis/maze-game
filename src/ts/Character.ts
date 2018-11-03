class Character {
	public Name: string;

	public CurrentLocation: Cell;
	public EndLocation: any;

	private GridLayers: number;
	private GridWidth: number;
	private GridHeight: number;
	private MazeGrid: Cell[][][];
	private IsMazeSolved: boolean;
	private Utilities = new Utils();

	constructor(name: string, startingLocation: Cell, mazeGrid: Cell[][][], public endLocation: any) {

		this.Name = name;
		this.CurrentLocation = startingLocation;

		this.MazeGrid = mazeGrid;
		this.GridLayers = this.MazeGrid.length;
		this.GridWidth = this.MazeGrid[0].length;
		this.GridHeight = this.MazeGrid[0][0].length;
		this.EndLocation = endLocation;
		this.IsMazeSolved = false;

	}

	public move(direction?: string) {
		switch (direction) {
			case this.Utilities.North:
				if (this.CurrentLocation.North && this.CurrentLocation.Y > 0)
					this.CurrentLocation = this.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y - 1][this.CurrentLocation.X];
				break;
			case this.Utilities.East:
				if (this.CurrentLocation.East && this.CurrentLocation.X < this.GridWidth - 1)
					this.CurrentLocation = this.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y][this.CurrentLocation.X + 1];
				break;
			case this.Utilities.South:
				if (this.CurrentLocation.South && this.CurrentLocation.Y < this.GridHeight - 1)
					this.CurrentLocation = this.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y + 1][this.CurrentLocation.X];
				break;
			case this.Utilities.West:
				if (this.CurrentLocation.West && this.CurrentLocation.X > 0)
					this.CurrentLocation = this.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y][this.CurrentLocation.X - 1];
				break;
			case this.Utilities.Up:
				if (this.CurrentLocation.Z === this.GridLayers - 1)
					this.CurrentLocation = this.MazeGrid[0][this.CurrentLocation.Y][this.CurrentLocation.X];
				else
					this.CurrentLocation = this.MazeGrid[this.CurrentLocation.Z + 1][this.CurrentLocation.Y][this.CurrentLocation.X];
				break;
			case this.Utilities.Down:
				if (this.CurrentLocation.Z === 0)
					this.CurrentLocation = this.MazeGrid[this.GridLayers - 1][this.CurrentLocation.Y][this.CurrentLocation.X];
				else
					this.CurrentLocation = this.MazeGrid[this.CurrentLocation.Z - 1][this.CurrentLocation.Y][this.CurrentLocation.X];
				break;
		}

		if (this.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y][this.CurrentLocation.X] ===
				this.MazeGrid[this.EndLocation.Z][this.EndLocation.Y][this.EndLocation.X]) {
				// SOLVED THE MAZE!
				this.IsMazeSolved = true;
		}

		return {
			Character: {
				Z: this.CurrentLocation.Z,
				Y: this.CurrentLocation.Y,
				X: this.CurrentLocation.X,
			},
			End: {
				Z: this.EndLocation.Z,
				Y: this.EndLocation.Y,
				X: this.EndLocation.X,
			},
			IsMazeSolved: this.IsMazeSolved,
		};

	}
}
