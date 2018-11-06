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

class HTMLCharacterView implements ICharacterView {
	public MyCharacter: Character;
	public CharacterIcon: string;
	public SolvedCharacterIcon: string;
	public EndIcon: string;
	public SolvedEndIcon: string;
	public CurrentCharacterIcon: string;
	public CurrentEndIcon: string;

	constructor(
		myCharacter: Character,
		characterIcon: string,
		solvedCharacterEndIcon: string,
		mazeEndIcon: string,
		solvedMazeEndIcon: string) {

		this.MyCharacter = myCharacter;
		this.CharacterIcon = characterIcon;
		this.SolvedCharacterIcon = solvedCharacterEndIcon;
		this.EndIcon = mazeEndIcon;
		this.SolvedEndIcon = solvedMazeEndIcon;
		this.CurrentCharacterIcon = characterIcon;
		this.CurrentEndIcon = mazeEndIcon;

		this.move();
	}

	public move() {

		// Move the character on *every* level, not just the current level
		let selectedCells = document.querySelectorAll(`.y${this.MyCharacter.PreviousLocation.Y}x${this.MyCharacter.PreviousLocation.X}`);

		for (let i = 0; i < selectedCells.length; i++) {
			selectedCells[i].innerHTML = "";
		}
		const playAgain = (document.querySelector("#play-again") as HTMLElement);

		if (this.IsSolved()) {
			playAgain.style.display = "block";
			this.CurrentCharacterIcon = this.SolvedCharacterIcon;
			this.CurrentEndIcon = this.SolvedEndIcon;
		} else {
			playAgain.style.display = "none";
			this.CurrentCharacterIcon = this.CharacterIcon;
			this.CurrentEndIcon = this.EndIcon;
		}

		const end = (document.querySelector(`.winter.y${this.MyCharacter.ThisMaze.EndLocation.Y}x${this.MyCharacter.ThisMaze.EndLocation.X}`) as HTMLElement);

		end.innerHTML = this.CurrentEndIcon;

		selectedCells = document.querySelectorAll(`.y${this.MyCharacter.CurrentLocation.Y}x${this.MyCharacter.CurrentLocation.X}`);

		for (let i = 0; i < selectedCells.length; i++) {
			selectedCells[i].innerHTML = this.CurrentCharacterIcon;
		}
	}

	private IsSolved() {
		return this.MyCharacter.ThisMaze.IsMazeSolved(this.MyCharacter.CurrentLocation);
	}
}
