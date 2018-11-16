class Utils	 {

	public readonly North: string;
	public readonly East: string;
	public readonly South: string;
	public readonly West: string;
	public readonly Up: string;
	public readonly Down: string;
	public readonly Directions: string[];

	public readonly Back: string;
	// public self: Utils;

	constructor() {
		this.North = "N";
		this.East = "E";
		this.South = "S";
		this.West = "W";
		this.Up = "U";
		this.Down = "D";
		this.Directions = [
			this.North,
			this.South,
			this.West,
			this.East,
			this.Up,
			this.Down,
		];
		this.Back = "B";
		// this.self = new Utils();
	}

	public getRandomIntInclusive(min: number, max: number) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
		// The maximum is inclusive and the minimum is inclusive
	}

	public getRandomDirections() {
		return this.shuffle(this.Directions);
	}

	/**
	 * Given a decompressed template, return a path, start, and end
	 * @param template the decompressed template to break apart
	 */
	public uncompressTemplate(template: any) {
		const decompressed = LZString.decompressFromEncodedURIComponent(template);
		// console.log(decompressed);
		let decompressedObject = JSON.parse(decompressed);
		// let decompressedObject = JSON.parse(template);
		decompressedObject["StartLocation"] = JSON.parse(decompressedObject["StartLocation"]);
		decompressedObject["EndLocation"] = JSON.parse(decompressedObject["EndLocation"]);
		decompressedObject["MazeDifficulty"] = parseInt(decompressedObject["MazeDifficulty"], 10);
		decompressedObject["GridWidth"] = parseInt(decompressedObject["GridWidth"], 10);
		decompressedObject["GridHeight"] = parseInt(decompressedObject["GridHeight"], 10);
		decompressedObject["GridLayers"] = parseInt(decompressedObject["GridLayers"], 10);
		return decompressedObject;
	}

	public compressionTest(MyMaze: Maze) {
		console.log("BASE64:");
		console.log(this.b64EncodeUnicode(JSON.stringify(this.compressTemplate(MyMaze))));
		console.log("LZ String:");
		console.log(LZString.compressToEncodedURIComponent(JSON.stringify(this.compressTemplate(MyMaze))));
	}
	
	public b64EncodeUnicode(str: string) {
		// first we use encodeURIComponent to get percent-encoded UTF-8,
		// then we convert the percent encodings into raw bytes which
		// can be fed into btoa.
		return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
			function toSolidBytes(match, p1) {
				 // @ts-ignore
				return String.fromCharCode('0x' + p1);
		}));
	}

	public compressTemplate(myMaze: Maze) {
		const template = {
			MazePath: myMaze.MazePath,
			StartLocation: JSON.stringify(myMaze.StartLocation),
			EndLocation: JSON.stringify(myMaze.EndLocation),
			BestPath: myMaze.BestPath,
			MazeDifficulty: myMaze.MazeDifficulty,
			GridWidth: myMaze.GridWidth,
			GridHeight: myMaze.GridHeight,
			GridLayers: myMaze.GridLayers,
		};
		// console.log(template);
		return LZString.compressToEncodedURIComponent(JSON.stringify(template));
		// return JSON.stringify(template);
	}

	/**
	 * Shuffles array in place.
	 * @param {Array} array items An array containing the items.
	 */
	private shuffle(array: any) {
		let j;
		let x;
		let i;
		for (i = array.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = array[i];
			array[i] = array[j];
			array[j] = x;
		}
		return array;
	}
}
