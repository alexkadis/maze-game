interface ICharacterView {
	Name: string;
	CharacterIcon: string;
	SolvedCharacterEndIcon: string;
	MazeEndIcon: string;
	SolvedMazeEndIcon: string;
	IsMazeSolved: boolean;
}

class HTMLCharacterView implements ICharacterView {
	public Name: string;
	public CharacterIcon: string;
	public SolvedCharacterEndIcon: string;
	public MazeEndIcon: string;
	public SolvedMazeEndIcon: string;
	public IsMazeSolved: boolean;

	constructor(name: string,
		characterIcon: string,
		solvedCharacterEndIcon: string,
		mazeEndIcon: string,
		solvedMazeEndIcon: string,
		isMazeSolved: boolean = false) {
			this.Name = name;
			this.CharacterIcon = characterIcon;
			this.SolvedCharacterEndIcon = solvedCharacterEndIcon;
			this.MazeEndIcon = mazeEndIcon;
			this.SolvedMazeEndIcon = solvedMazeEndIcon;
			this.IsMazeSolved = isMazeSolved;
	}

	displayCharacter() {
		if (this.IsMazeSolved) {
			// SOLVED THE MAZE!
			this.CharacterIcon = String.fromCharCode(0xD83D, 0xDE0E); // "😎";
			this.MazeEndIcon = String.fromCharCode(0xD83C, 0xDF89); //"🎉";
		} else {
			this.CharacterIcon = String.fromCharCode(0xD83D, 0xDE00); // 😀"
			this.MazeEndIcon = String.fromCharCode(0xD83C, 0xDFC1);  // "🏁"; 
		}
	}

}