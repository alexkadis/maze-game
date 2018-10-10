class ViewMaze {

	public MazeGrid: Cell[][][];

	private GridWidth: number;

	private WallCell : Cell;

	constructor(public mazegrid : Cell[][][],  public wallCell : Cell) {
		this.MazeGrid = mazegrid;
		this.GridWidth = mazegrid[0][0].length;
		this.WallCell = wallCell;
	}

	public displayMaze() {
		let html: string = "";

		for (let layer = 0; layer < this.MazeGrid.length; layer++) {
			const layerName: string = this.getNameFromLayer(layer);

			html += `<div id="layer${layer}" class="${layerName}">`;
			html += `<h3>Layer ${layerName}</h3>`;
			html += `<table id="layer${layer}-table class="${layerName}">`;

			for (let row = 0; row < this.MazeGrid[layer].length; row++) {
				html += "<tr class='r'>";

				for (let column = 0; column < this.GridWidth; column++) {
					const classes: string = this.getClassesFromCell(this.MazeGrid[layer][row][column]);
					html += `<td class="cell ${classes} ${layerName} y${row}x${column}">&nbsp;`;
					html += "</td>";
				}
				html += "</tr> <!-- end row -->\n";
			}
			html += "</table>";
			html += "</div>";
		}
		$("#maze-game").html(html);

		console.log(this.MazeGrid[0]);
	}

	private getClassesFromCell (cell: Cell) {

		let classes: string = "";
		console.log(cell);

		if (cell !== undefined) {
			if (cell.North === this.WallCell)
				classes += " top ";
			if (cell.East === this.WallCell)
				classes += " right ";
			if (cell.South === this.WallCell)
				classes += " bottom ";
			if (cell.West === this.WallCell)
				classes += " left ";
			if (cell.Up !== this.WallCell)
				classes += " up ";
			if (cell.Down !== this.WallCell)
				classes += " down ";
		}


		return classes;
	}

	private getNameFromLayer (layer: number) {
		switch (layer) {
			case 0:
				return "winter";
			case 1:
				return "spring";
			case 2:
				return "summer";
			case 3:
				return "fall";
			default:
				return "";
		}
	}

}