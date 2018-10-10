
class Cell {
	public North: Cell | null;
	public East: Cell | null;
	public South: Cell | null;
	public West: Cell | null;
	public Up: Cell | null;
	public Down: Cell | null;
	public Z: number;
	public Y: number;
	public X: number;
	public isWall: boolean;

	constructor () {
		this.North = null;
		this.East = null;
		this.South = null;
		this.West = null;
		this.Up = null;
		this.Down = null;
		this.Z = -1;
		this.Y = -1;
		this.X = -1;
		this.isWall = false;
	}
	// public assignCellToNewLocation (newZ: number, newY: number, newX: number) {
	// 	this.Z = newZ;
	// 	this.Y = newY;
	// 	this.X = newX;
	// }
}
