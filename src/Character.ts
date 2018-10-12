
/*
Figure out a way to have a "character" that can move North, South, East, West
	- The character starts at the starting point
	- Character ends at the ending point
	- Character can't move past a wall
*/
class Character {
	public Color: string;
	public Name: string;

	// location
	public CurrentLocation: Cell;

	public North: string;
	public East: string;
	public South: string;
	public West: string;
	public Up: string;
	public Down: string;

	private GridLayers: number;
	private MazeGrid: Cell[][][];
	public EndCell: Cell;

	public CharacterIcon: string;
	public EndIcon: string;

	constructor (name: string, color: string, startingLocation: Cell, mazeGrid: Cell[][][], public endCell : Cell) {

		this.Color = color;
		this.Name = name;
		this.CurrentLocation = startingLocation;

		this.North	= "North";
		this.East	= "East";
		this.South	= "South";
		this.West	= "West";
		this.Up		= "Up";
		this.Down	= "Down";

		this.MazeGrid = mazeGrid;
		this.GridLayers = this.MazeGrid.length;
		this.EndCell = endCell;

		this.CharacterIcon = "😀";
		this.EndIcon = "🏁";

		this.move("");
	}

	public move (direction: string) {
		
		$(`.y${this.CurrentLocation.Y}x${this.CurrentLocation.X}`).text("");
		$(`.y${this.CurrentLocation.Y}x${this.CurrentLocation.X}`).removeClass(this.Name);
		// console.log(`OLD Location: Z:${this.CurrentLocation.Z} y:${this.CurrentLocation.Y} x:${this.CurrentLocation.X}`);
		switch (direction) {
			case this.North:
				if (this.CurrentLocation.North != null)
					this.CurrentLocation = this.CurrentLocation.North;
				break;
			case this.East:
				if (this.CurrentLocation.East != null)
					this.CurrentLocation = this.CurrentLocation.East;
				break;
			case this.South:
				if (this.CurrentLocation.South != null)
					this.CurrentLocation = this.CurrentLocation.South;
				break;
			case this.West:
				if (this.CurrentLocation.West != null)
					this.CurrentLocation = this.CurrentLocation.West;
				break;
			case this.Up:
				if (this.CurrentLocation.Z === this.GridLayers - 1)
					this.CurrentLocation = this.MazeGrid[0][this.CurrentLocation.Y][this.CurrentLocation.X];
				else
					this.CurrentLocation = this.MazeGrid[this.CurrentLocation.Z + 1][this.CurrentLocation.Y][this.CurrentLocation.X];
				break;
			case this.Down:
				if (this.CurrentLocation.Z === 0)
					this.CurrentLocation = this.MazeGrid[this.GridLayers - 1][this.CurrentLocation.Y][this.CurrentLocation.X];
				else
					this.CurrentLocation = this.MazeGrid[this.CurrentLocation.Z - 1][this.CurrentLocation.Y][this.CurrentLocation.X];
				break;
			default:
				// console.log(`Invalid attempt to move from ${this.CurrentLocation} ${direction}`);
				break;
		}
		if (this.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y][this.CurrentLocation.X] == this.EndCell) {
			this.CharacterIcon = "😎";
			this.EndIcon = "🎉";
			$(`.y${this.CurrentLocation.Y}x${this.CurrentLocation.X}`).addClass("game-won");
		}
		$(`.winter.y${this.EndCell.Y}x${this.EndCell.X}`).text(this.EndIcon);
		$(`.y${this.CurrentLocation.Y}x${this.CurrentLocation.X}`).text(this.CharacterIcon);
		
		// console.log(`New Location: Z:${this.CurrentLocation.Z} y:${this.CurrentLocation.Y} x:${this.CurrentLocation.X}`);
		$(`.y${this.CurrentLocation.Y}x${this.CurrentLocation.X}`).addClass(this.Name);
	}
}
