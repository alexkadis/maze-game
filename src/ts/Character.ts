class Character {
	public Color: string;
	public Name: string;

	public CurrentLocation: Cell;
	public EndLocation: any;
	public CharacterIcon: string;
	public EndIcon: string;

	public readonly North: string = "North";
	public readonly East: string = "East";
	public readonly South: string = "South";
	public readonly West: string = "West";
	public readonly Up: string = "Up";
	public readonly Down: string = "Down";

	private GridLayers: number;
	private GridWidth: number;
	private GridHeight: number;
	private MazeGrid: Cell[][][];

	constructor (name: string, color: string, startingLocation: Cell, mazeGrid: Cell[][][], public endLocation: any) {

		this.Color = color;
		this.Name = name;
		this.CurrentLocation = startingLocation;

		this.MazeGrid = mazeGrid;
		this.GridLayers = this.MazeGrid.length;
		this.GridWidth = this.MazeGrid[0].length;
		this.GridHeight = this.MazeGrid[0][0].length;
		this.EndLocation = endLocation;

		this.CharacterIcon = String.fromCharCode(0xD83D, 0xDE00); // 😀"
		this.EndIcon = String.fromCharCode(0xD83C, 0xDFC1);  // "🏁"; 

		this.move("");
	}

	public move (direction: string) {
		$(`.y${this.CurrentLocation.Y}x${this.CurrentLocation.X}`).text("");
		$(`.y${this.CurrentLocation.Y}x${this.CurrentLocation.X}`).removeClass(this.Name);
		switch (direction) {
			case this.North:
				if (this.CurrentLocation.North && this.CurrentLocation.Y > 0)
					this.CurrentLocation = this.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y - 1][this.CurrentLocation.X];
				break;
			case this.East:
				if (this.CurrentLocation.East && this.CurrentLocation.X < this.GridWidth - 1)
					this.CurrentLocation = this.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y][this.CurrentLocation.X + 1];
				break;
			case this.South:
				if (this.CurrentLocation.South && this.CurrentLocation.Y < this.GridHeight - 1)
					this.CurrentLocation = this.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y + 1][this.CurrentLocation.X];
				break;
			case this.West:
				if (this.CurrentLocation.West && this.CurrentLocation.X > 0)
					this.CurrentLocation = this.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y][this.CurrentLocation.X - 1];
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
		// if (this.EndLocation !== undefined && typeof this.EndLocation !== undefined &&  this.EndLocation !== null) {
			if (this.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y][this.CurrentLocation.X] === this.MazeGrid[this.EndLocation.Z][this.EndLocation.Y][this.EndLocation.X]) {
				// SOLVED THE MAZE!
				this.CharacterIcon = String.fromCharCode(0xD83D, 0xDE0E); // "😎";
				this.EndIcon = String.fromCharCode(0xD83C, 0xDF89); //"🎉";
				$(`.y${this.CurrentLocation.Y}x${this.CurrentLocation.X}`).addClass("game-won");
				$(`#play-again`).show();
				// $(`.desc`).hide();
				// $(`.gameButtons`).hide();
				// $(`.mazeHeader`).hide();
			}
			
			$(`.winter.y${this.EndLocation.Y}x${this.EndLocation.X}`).text(this.EndIcon);
			$(`.y${this.CurrentLocation.Y}x${this.CurrentLocation.X}`).text(this.CharacterIcon);
			$(`.y${this.CurrentLocation.Y}x${this.CurrentLocation.X}`).addClass(this.Name);
		// }
	}

	// Solves the maze and sees how many moves it takes to do so
	public solveMaze() {
		
	}
	
}
