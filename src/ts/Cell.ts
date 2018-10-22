class Cell {
	public North: boolean;
	public East: boolean;
	public South: boolean;
	public West: boolean;
	public Up: boolean;
	public Down: boolean;

	public Z: number;
	public Y: number;
	public X: number;

	constructor (z: number, y: number, x: number) {
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
