interface ICharacterView {
	IsMazeSolved: boolean;
	Name: string;

	CharacterIcon: string;
	SolvedCharacterIcon: string;
	CurrentCharacterIcon: string;
	EndIcon: string;
	SolvedEndIcon: string;
	CurrentEndIcon: string;
	CharacterLocation: any;
	EndLocation: any;
	move (newLocations: any): any;
}

class HTMLCharacterView implements ICharacterView {
	public IsMazeSolved: boolean = false;
	public Name: string;
	public CharacterIcon: string;
	public SolvedCharacterIcon: string;
	public EndIcon: string;
	public SolvedEndIcon: string;
	public CurrentCharacterIcon: string;
	public CurrentEndIcon: string;
	public CharacterLocation: any;
	public EndLocation: any;

	constructor (
		name: string,
		characterIcon: string,
		solvedCharacterEndIcon: string,
		mazeEndIcon: string,
		solvedMazeEndIcon: string) {
		this.Name = name;
		this.CharacterIcon = characterIcon;
		this.SolvedCharacterIcon = solvedCharacterEndIcon;
		this.EndIcon = mazeEndIcon;
		this.SolvedEndIcon = solvedMazeEndIcon;

		this.CurrentCharacterIcon = characterIcon;
		this.CurrentEndIcon = mazeEndIcon;
		this.CharacterLocation = {Z: -1, Y: -1, X: -1};
		this.EndLocation = { Z: -1, Y: -1, X: -1 };
	}

	public setCharacterIcon () {
		if (this.IsMazeSolved) {
			// SOLVED THE MAZE!
			this.CurrentCharacterIcon = this.SolvedCharacterIcon;
			this.CurrentEndIcon = this.SolvedEndIcon;
		} else {
			this.CurrentCharacterIcon = this.CharacterIcon;
			this.CurrentEndIcon = this.EndIcon;
		}
	}

	public setEndLocation (locations: any) {
		this.EndLocation = locations.End;
		$(`.winter.y${this.EndLocation.Y}x${this.EndLocation.X}`).text(this.CurrentEndIcon);
	}

	public move (locations: any) {

		// Remove what's currently there
		$(`.y${this.CharacterLocation.Y}x${this.CharacterLocation.X}`).text("");
		$(`.y${this.CharacterLocation.Y}x${this.CharacterLocation.X}`).removeClass(this.Name);

		this.CharacterLocation = locations.Character;
		this.EndLocation = locations.End;
		this.IsMazeSolved = locations.IsMazeSolved;

		if (this.IsMazeSolved) {
			$(`#play-again`).show();
			this.CurrentCharacterIcon = this.SolvedCharacterIcon;
			this.CurrentEndIcon = this.SolvedEndIcon;
		} else {
			$(`#play-again`).hide();
			this.CurrentCharacterIcon = this.CharacterIcon;
			this.CurrentEndIcon = this.EndIcon;
		}
		$(`.winter.y${this.EndLocation.Y}x${this.EndLocation.X}`).text(this.CurrentEndIcon);
		$(`.y${this.CharacterLocation.Y}x${this.CharacterLocation.X}`).text(this.CurrentCharacterIcon);
		$(`.y${this.CharacterLocation.Y}x${this.CharacterLocation.X}`).addClass(this.Name);

	}
}
