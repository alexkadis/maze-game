class Character {
	public Name: string;
	public CurrentLocation: any;
	public PreviousLocation: any;
	public ThisMaze: Maze;
	private Utilities = new Utils();

	constructor(name: string, myMaze: Maze) {
		this.Name = name;
		this.ThisMaze = myMaze;
		this.CurrentLocation = JSON.parse(JSON.stringify(this.ThisMaze.StartLocation));
		this.move("");
	}

	/**
	 * If the direction parameter is valid, change the current location to that cell
	 * @param direction Direction to move the character
	 */
	public move(direction: string) {
		// Make a clean copy (not a reference)
		this.PreviousLocation = JSON.parse(JSON.stringify(this.CurrentLocation));

		if (this.CanMoveDirection(direction)) {
			switch (direction) {
				case this.Utilities.North:
					this.SetRelativeLocation(0, -1, 0);
					break;
				case this.Utilities.East:
					this.SetRelativeLocation(0, 0, 1);
					break;
				case this.Utilities.South:
					this.SetRelativeLocation(0, 1, 0);
					break;
				case this.Utilities.West:
					this.SetRelativeLocation(0, 0, -1);
					break;
				case this.Utilities.Up:
					if (this.CurrentLocation.Z === this.ThisMaze.GridLayers - 1) {
						this.SetExactLocation(0, null, null);
					} else {
						this.SetRelativeLocation(1, 0, 0);
					}
					break;
				case this.Utilities.Down:
					if (this.CurrentLocation.Z === 0) {
						this.SetExactLocation(this.ThisMaze.GridLayers - 1, null, null);
					} else {
						this.SetRelativeLocation(-1, 0, 0);
					}
					break;
			}
			return true;
		}
		return false;
	}

	public ResetCharacter() {
		this.ThisMaze.SetMazeSolvedToFalse();
		this.CurrentLocation = JSON.parse(JSON.stringify(this.ThisMaze.StartLocation));
	}

	/**
	 * Moves the character to an *exact* location within the grid
	 * @param z Z-Axis
	 * @param y Y-Axis
	 * @param x X-Axis
	 */
	public SetExactLocation(z: number | null, y: number | null, x: number | null) {
		if (z !== null) {
			this.CurrentLocation.Z = z;
		}
		if (y !== null) {
			this.CurrentLocation.Y = y;
		}
		if (x !== null) {
			this.CurrentLocation.X = x;
		}
	}

	/**
	 * Moves the character to a location relative to the current location within the grid
	 * @param z Z-Axis
	 * @param y Y-Axis
	 * @param x X-Axis
	 */
	public SetRelativeLocation(z: number, y: number, x: number) {
		this.CurrentLocation.Z += z;
		this.CurrentLocation.Y += y;
		this.CurrentLocation.X += x;
	}

	/**
	 * Checks to see if a character can move a direction
	 * @param direction The direction the character wants to move
	 */
	public CanMoveDirection(direction: string) {
		if (direction === this.Utilities.Up || direction === this.Utilities.Down) {
			return true;
		}
		switch (direction) {
			case this.Utilities.North:
				return this.ThisMaze.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y][this.CurrentLocation.X].North;
				break;
			case this.Utilities.East:
				return this.ThisMaze.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y][this.CurrentLocation.X].East;
				break;
			case this.Utilities.South:
				return this.ThisMaze.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y][this.CurrentLocation.X].South;
				break;
			case this.Utilities.West:
				return this.ThisMaze.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y][this.CurrentLocation.X].West;
				break;
		}
	}
}
