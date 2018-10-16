
var currentLayer;
var GridLayers;
var GridHeight;
var GridWidth;
var MyCharacter;
function main() {
    currentLayer = 0;
    GridLayers = 4;
    GridHeight = 8;
    GridWidth = 8;
    var myMaze = new Maze(GridLayers, GridHeight, GridWidth);
    myMaze.fillMaze();
    var mazeViewer = new MazeView(myMaze.MazeGrid, myMaze.EndCell);
    mazeViewer.displayMaze();
    showLayerHideOthers(currentLayer);
    MyCharacter = new Character("pinkdude", "pink", myMaze.MazeGrid[0][0][0], myMaze.MazeGrid, myMaze.EndCell);
}
function showLayerHideOthers(layerChoice) {
    if (GridLayers > 1) {
        for (var layer = 0; layer < GridLayers; layer++) {
            var layerId = "#layer" + layer;
            if (layer === layerChoice) {
                $(layerId).show();
            }
            else {
                $(layerId).hide();
            }
        }
    }
}
function goNorth() {
    MyCharacter.move(MyCharacter.North);
}
function goEast() {
    MyCharacter.move(MyCharacter.East);
}
function goSouth() {
    MyCharacter.move(MyCharacter.South);
}
function goWest() {
    MyCharacter.move(MyCharacter.West);
}
function goUp() {
    if (currentLayer < GridLayers - 1) {
        currentLayer++;
    }
    else {
        currentLayer = 0;
    }
    showLayerHideOthers(currentLayer);
    MyCharacter.move(MyCharacter.Up);
}
function goDown() {
    if (currentLayer === 0) {
        currentLayer = GridLayers - 1;
    }
    else {
        currentLayer--;
    }
    showLayerHideOthers(currentLayer);
    MyCharacter.move(MyCharacter.Down);
}


!function(t){var i={};function e(r){if(i[r])return i[r].exports;var n=i[r]={i:r,l:!1,exports:{}};return t[r].call(n.exports,n,n.exports,e),n.l=!0,n.exports}e.m=t,e.c=i,e.d=function(t,i,r){e.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,i){if(1&i&&(t=e(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var n in t)e.d(r,n,function(i){return t[i]}.bind(null,n));return r},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="",e(e.s=0)}([function(t,i,e){e(1),e(2),e(3),e(4),t.exports=e(5)},function(t,i,e){"use strict"},function(t,i,e){"use strict";!function(){function t(t,i,e,r,n){this.endCell=n,this.North="North",this.East="East",this.South="South",this.West="West",this.Up="Up",this.Down="Down",this.Color=i,this.Name=t,this.CurrentLocation=e,this.MazeGrid=r,this.GridLayers=this.MazeGrid.length,this.GridWidth=this.MazeGrid[0].length,this.GridHeight=this.MazeGrid[0][0].length,this.EndCell=n,this.CharacterIcon="😀",this.EndIcon="🏁",this.move("")}t.prototype.move=function(t){switch($(".y"+this.CurrentLocation.Y+"x"+this.CurrentLocation.X).text(""),$(".y"+this.CurrentLocation.Y+"x"+this.CurrentLocation.X).removeClass(this.Name),t){case this.North:this.CurrentLocation.North&&this.CurrentLocation.Y>0&&(this.CurrentLocation=this.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y-1][this.CurrentLocation.X]);break;case this.East:this.CurrentLocation.East&&this.CurrentLocation.X<this.GridWidth-1&&(this.CurrentLocation=this.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y][this.CurrentLocation.X+1]);break;case this.South:this.CurrentLocation.South&&this.CurrentLocation.Y<this.GridHeight-1&&(this.CurrentLocation=this.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y+1][this.CurrentLocation.X]);break;case this.West:this.CurrentLocation.West&&this.CurrentLocation.X>0&&(this.CurrentLocation=this.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y][this.CurrentLocation.X-1]);break;case this.Up:this.CurrentLocation.Z===this.GridLayers-1?this.CurrentLocation=this.MazeGrid[0][this.CurrentLocation.Y][this.CurrentLocation.X]:this.CurrentLocation=this.MazeGrid[this.CurrentLocation.Z+1][this.CurrentLocation.Y][this.CurrentLocation.X];break;case this.Down:0===this.CurrentLocation.Z?this.CurrentLocation=this.MazeGrid[this.GridLayers-1][this.CurrentLocation.Y][this.CurrentLocation.X]:this.CurrentLocation=this.MazeGrid[this.CurrentLocation.Z-1][this.CurrentLocation.Y][this.CurrentLocation.X]}this.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y][this.CurrentLocation.X]==this.EndCell&&(this.CharacterIcon="😎",this.EndIcon="🎉",$(".y"+this.CurrentLocation.Y+"x"+this.CurrentLocation.X).addClass("game-won"),$(".new-button").show(),$(".desc").hide(),$(".gameButtons").hide(),$(".mazeHeader").hide()),$(".winter.y"+this.EndCell.Y+"x"+this.EndCell.X).text(this.EndIcon),$(".y"+this.CurrentLocation.Y+"x"+this.CurrentLocation.X).text(this.CharacterIcon),$(".y"+this.CurrentLocation.Y+"x"+this.CurrentLocation.X).addClass(this.Name)}}()},function(t,i,e){"use strict";!function(){function t(t,i,e){this.gridLayers=t,this.gridWidth=i,this.gridHeight=e,this.North="North",this.East="East",this.South="South",this.West="West",this.Up="Up",this.Down="Down",this.GridLayers=t,this.GridWidth=i,this.GridHeight=e,this.MazeGrid=this.generateGrid(),this.CellsList=[new Cell(-1,-1,-1)],this.EndCell=new Cell(-1,-1,-1)}t.prototype.fillMaze=function(){this.fillMazeRandom()},t.prototype.fillMazeProcedural=function(){},t.prototype.encodeMaze=function(){console.log(JSON.stringify(this.MazeGrid))},t.prototype.fillMazeRandom=function(){this.CellsList.push(new Cell(0,this.getRandomIntInclusive(0,this.gridHeight-1),this.getRandomIntInclusive(0,this.gridWidth-1)));for(var t=-1;this.CellsList.length>0;){t=this.CellsList.length-1;for(var i=this.CellsList[t],e=this.getRandomDirections(),r=0;r<e.length;r++){var n=this.directionModifier(this.CellsList[t],e[r]);if(this.isEmptyCell(n.Z,n.Y,n.X)){var s=this.getReverseDirection(i,n,e[r]);this.MazeGrid[i.Z][i.Y][i.X]=s.current,this.MazeGrid[n.Z][n.Y][n.X]=s.next,this.CellsList.push(n),t=-1;break}}-1!==t&&this.CellsList.splice(t,1)}this.EndCell=this.MazeGrid[0][this.getRandomIntInclusive(1,this.gridHeight-1)][this.getRandomIntInclusive(1,this.gridWidth-1)],this.encodeMaze()},t.prototype.generateGrid=function(){for(var t=new Array(this.GridLayers),i=0;i<this.GridLayers;i++){t[i]=new Array(this.GridHeight);for(var e=0;e<this.GridHeight;e++)t[i][e]=new Array(this.GridWidth),t[i][e].fill()}return t},t.prototype.getReverseDirection=function(t,i,e){switch(e){case this.North:t.North=!0,i.South=!0;break;case this.East:t.East=!0,i.West=!0;break;case this.South:t.South=!0,i.North=!0;break;case this.West:t.West=!0,i.East=!0;break;case this.Up:t.Up=!0,i.Down=!0;break;case this.Down:t.Down=!0,i.Up=!0}return{current:t,next:i}},t.prototype.getRandomIntInclusive=function(t,i){return t=Math.ceil(t),i=Math.floor(i),Math.floor(Math.random()*(i-t+1))+t},t.prototype.getRandomDirections=function(){return this.shuffle([this.North,this.South,this.West,this.East,this.Up,this.Down])},t.prototype.shuffle=function(t){var i,e,r;for(r=t.length-1;r>0;r--)i=Math.floor(Math.random()*(r+1)),e=t[r],t[r]=t[i],t[i]=e;return t},t.prototype.isEmptyCell=function(t,i,e){return t>=0&&t<this.GridLayers&&i>=0&&i<this.GridHeight&&e>=0&&e<this.GridWidth&&(null===this.MazeGrid[t][i][e]||void 0===this.MazeGrid[t][i][e])},t.prototype.directionModifier=function(t,i){switch(i){case this.North:return new Cell(t.Z,t.Y-1,t.X);case this.East:return new Cell(t.Z,t.Y,t.X+1);case this.South:return new Cell(t.Z,t.Y+1,t.X);case this.West:return new Cell(t.Z,t.Y,t.X-1);case this.Up:return t.Z===this.gridLayers-1?new Cell(0,t.Y,t.X):new Cell(t.Z+1,t.Y,t.X);case this.Down:return 0===t.Z?new Cell(this.GridLayers-1,t.Y,t.X):new Cell(t.Z-1,t.Y,t.X)}return new Cell(t.Z,t.Y,t.Z)}}()},function(t,i,e){"use strict";!function(){function t(t,i){this.mazegrid=t,this.endCell=i,this.MazeGrid=t,this.GridWidth=t[0][0].length,this.EndCell=i}t.prototype.displayMaze=function(){$(".new-button").hide(),$(".desc").show(),$(".gameButtons").show(),$(".gameButtons").show(),$(".MazeHeader").show();for(var t="",i=0;i<this.MazeGrid.length;i++){var e=this.getNameFromLayer(i);t+='<div id="layer'+i+'" class="'+e+'">',t+='<h3 class="'+e+' mazeHeader"><button onclick="goDown()" class="down-button">&nbsp;</button> <span class="layer-name">'+e+'</span> <button onclick="goUp()" class="up-button">&nbsp;</button></h3>',t+='<table id="layer'+i+'-table class="'+e+'">';for(var r=0;r<this.MazeGrid[i].length;r++){t+="<tr class='r'>";for(var n=0;n<this.GridWidth;n++){t+='<td class="cell '+this.getClassesFromCell(this.MazeGrid[i][r][n])+" "+e+" y"+r+"x"+n+'">&nbsp;',t+="</td>"}t+="</tr> \x3c!-- end row --\x3e\n"}t+="</table>",t+="</div>"}$("#maze-game").html(t),console.log(this.MazeGrid[0])},t.prototype.getClassesFromCell=function(t){var i="";return t.North||(i+=" top "),t.East||(i+=" right "),t.South||(i+=" bottom "),t.West||(i+=" left "),t.Up||(i+=" up "),t.Down||(i+=" down "),this.MazeGrid[t.Z][t.Y][t.X]==this.EndCell&&(i+=" end "),i},t.prototype.getNameFromLayer=function(t){switch(t){case 0:return"winter";case 1:return"spring";case 2:return"summer";case 3:return"fall";default:return""}}}()},function(t,i,e){"use strict"}]);