interface ICell {
	North: boolean;
	East: boolean;
	South: boolean;
	West: boolean;
	Up: boolean;
	Down: boolean;

	Z: number;
	Y: number;
	X: number;

	[direction: string]: any;
}

class Cell implements ICell {
	public North: boolean;
	public East: boolean;
	public South: boolean;
	public West: boolean;
	public Up: boolean;
	public Down: boolean;

	public Z: number;
	public Y: number;
	public X: number;

	[direction: string]: any;

	constructor(z: number, y: number, x: number) {
		this.North = false;
		this.East = false;
		this.South = false;
		this.West = false;
		this.Up = false;
		this.Down = false;
		this.Z = z;
		this.Y = y;
		this.X = x;
	}
}
