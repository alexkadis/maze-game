class MazeView {
	public MazeGrid: Cell[][][];
	private GridWidth: number;
	private WallCell : Cell;
	public EndCell: Cell;

	constructor(public mazegrid : Cell[][][],  public wallCell : Cell, public endCell : Cell) {
		this.MazeGrid = mazegrid;
		this.GridWidth = mazegrid[0][0].length;
		this.WallCell = wallCell;
		this.EndCell = endCell;
	}
	public displayMaze() {
		let html: string = "";

		for (let layer = 0; layer < this.MazeGrid.length; layer++) {
			const layerName: string = this.getNameFromLayer(layer);

			html += `<div id="layer${layer}" class="${layerName}">`;
			html += `<h3 class="${layerName} mazeHeader"><button onclick="goDown()" class="down-button">&nbsp;</button> <span class="layer-name">${layerName}</span> <button onclick="goUp()" class="up-button">&nbsp;</button></h3>`;
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

		if (cell.North === this.WallCell.South)
			classes += " top ";
		if (cell.East === this.WallCell.West)
			classes += " right ";
		if (cell.South === this.WallCell.North)
			classes += " bottom ";
		if (cell.West === this.WallCell.East)
			classes += " left ";
		if (cell.Up !== this.WallCell.Down)
			classes += " up ";
		if (cell.Down !== this.WallCell.Up)
			classes += " down ";
		if (this.MazeGrid[cell.Z][cell.Y][cell.X] == this.EndCell)
			classes += " end ";

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