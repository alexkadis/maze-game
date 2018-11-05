/*
	Use the Character class to move completely randomly through the maze
	from the given starting point to the given ending point.

	It's given a generated maze grid with starting and ending points
	It will keep going any random direction until it finds the end.
	Like any other character, it can't move through walls
	Another posibility - make it a little smarter, have it navigate the way
	that the maze generating algorithm works: keep moving until you can't,
	then back up until you get to where you want to go.

*/

class MazeNavigator {

	public attempts: number = 0;
	public path: string = "";
	private Utilities: Utils;
	private Character: Character;
	private MyMaze: Maze;

	constructor(myMaze: Maze) {
		this.MyMaze = myMaze;
		this.MyMaze.SetMazeSolvedToFalse();
		this.Utilities = new Utils();
		this.Character = new Character("navigator", myMaze);
	}

	public Navigate() {
		let moved = false;
		while (!this.MyMaze.IsMazeSolved(this.Character.CurrentLocation)) {
			const directions = this.Utilities.getRandomDirections();
			for (let i = 0; i < directions.length; i++) {
				if (this.Character.CanMoveDirection(directions[i])) {
					this.Character.move(directions[i]);
					this.path += directions[i];
					this.attempts++;
					moved = true;
					break;
				}
			}
			if (!moved) {
				this.Character.CurrentLocation = this.Character.PreviousLocation;
			}
			moved = false;
		}
	}
}
