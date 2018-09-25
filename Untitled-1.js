var Maze, hideLevel, showLevel;
Maze = (function() {
  function Maze(width, height, depth) {
    var carved, cell, cells, dir, index, nx, ny, nz, x, y, z, _i, _len, _ref;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.grid = (function() {
      var _ref, _results;
      _results = [];
      for (z = 1, _ref = this.depth; 1 <= _ref ? z <= _ref : z >= _ref; 1 <= _ref ? z++ : z--) {
        _results.push((function() {
          var _ref2, _results2;
          _results2 = [];
          for (y = 1, _ref2 = this.height; 1 <= _ref2 ? y <= _ref2 : y >= _ref2; 1 <= _ref2 ? y++ : y--) {
            _results2.push((function() {
              var _ref3, _results3;
              _results3 = [];
              for (x = 1, _ref3 = this.width; 1 <= _ref3 ? x <= _ref3 : x >= _ref3; 1 <= _ref3 ? x++ : x--) {
                _results3.push(0);
              }
              return _results3;
            }).call(this));
          }
          return _results2;
        }).call(this));
      }
      return _results;
    }).call(this);
    cells = [
      {
        x: this.rand(this.width),
        y: this.rand(this.height),
        z: this.rand(this.depth)
      }
    ];
    while (cells.length > 0) {
      index = this.rand(2) === 0 ? this.rand(cells.length) : cells.length - 1;
      cell = cells[index];
      carved = false;
      _ref = this.randomDirections();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        dir = _ref[_i];
        nx = cell.x + Maze.dx[dir];
        ny = cell.y + Maze.dy[dir];
        nz = cell.z + Maze.dz[dir];
        if (nx >= 0 && ny >= 0 && nz >= 0 && nx < this.width && ny < this.height && nz < this.depth && this.grid[nz][ny][nx] === 0) {
          this.grid[cell.z][cell.y][cell.x] |= dir;
          this.grid[nz][ny][nx] |= Maze.opposite[dir];
          cells.push({
            x: nx,
            y: ny,
            z: nz
          });
          carved = true;
          break;
        }
      }
      if (!carved) {
        cells.splice(index, 1);
      }
    }
    this.grid[0][0][0] |= Maze.W;
    this.grid[this.depth - 1][this.height - 1][this.width - 1] |= Maze.E;
  }
  Maze.prototype.isNorth = function(x, y, z) {
    return (this.grid[z][y][x] & Maze.N) === Maze.N;
  };
  Maze.prototype.isSouth = function(x, y, z) {
    return (this.grid[z][y][x] & Maze.S) === Maze.S;
  };
  Maze.prototype.isEast = function(x, y, z) {
    return (this.grid[z][y][x] & Maze.E) === Maze.E;
  };
  Maze.prototype.isWest = function(x, y, z) {
    return (this.grid[z][y][x] & Maze.W) === Maze.W;
  };
  Maze.prototype.isUp = function(x, y, z) {
    return (this.grid[z][y][x] & Maze.U) === Maze.U;
  };
  Maze.prototype.isDown = function(x, y, z) {
    return (this.grid[z][y][x] & Maze.D) === Maze.D;
  };
  Maze.prototype.rand = function(n) {
    return Math.floor(Math.random() * n);
  };
  Maze.prototype.randomDirections = function() {
    var i, j, list, _ref;
    list = Maze.List.slice(0);
    i = list.length - 1;
    while (i > 0) {
      j = this.rand(i + 1);
      _ref = [list[j], list[i]], list[i] = _ref[0], list[j] = _ref[1];
      i--;
    }
    return list;
  };
  Maze.prototype.toHTML = function() {
    var cell, className, eastClass, html, row1, row2, southClass, x, y, z, _ref, _ref2, _ref3, _ref4;
    html = "";
    for (z = 0, _ref = this.depth; 0 <= _ref ? z < _ref : z > _ref; 0 <= _ref ? z++ : z--) {
      html += "<div class='blockMaze' id='level_" + z + "'";
      if (z > 0) {
        html += " style='display: none;'";
      }
      html += ">\n<div class='nav'>";
      html += "Level " + (z + 1) + ": ";
      if (z > 0) {
        html += "<a href='#' onclick='showLevel(" + (z - 1) + "); hideLevel(" + z + ");'>down</a>";
      }
      if ((0 < z && z < this.depth - 1)) {
        html += " | ";
      }
      if (z < this.depth - 1) {
        html += "<a href='#' onclick='showLevel(" + (z + 1) + "); hideLevel(" + z + ");'>up</a>";
      }
      html += "</div>\n<div class='r'>";
      for (x = 0, _ref2 = this.width * 2 + 1; 0 <= _ref2 ? x < _ref2 : x > _ref2; 0 <= _ref2 ? x++ : x--) {
        html += "<div class='w'></div>";
      }
      html += "</div>\n";
      for (y = 0, _ref3 = this.height; 0 <= _ref3 ? y < _ref3 : y > _ref3; 0 <= _ref3 ? y++ : y--) {
        className = this.isWest(0, y, z) ? "b" : "w";
        row1 = "<div class='r'><div class='" + className + "'></div>";
        row2 = "<div class='r'><div class='w'></div>";
        for (x = 0, _ref4 = this.width; 0 <= _ref4 ? x < _ref4 : x > _ref4; 0 <= _ref4 ? x++ : x--) {
          eastClass = this.isEast(x, y, z) ? "b" : "w";
          southClass = this.isSouth(x, y, z) ? "b" : "w";
          cell = "<div class='b'>";
          cell += "<div class='" + (this.isUp(x, y, z) ? 'u' : 'h') + "'></div>";
          cell += "<div class='" + (this.isDown(x, y, z) ? 'd' : 'h') + "'></div>";
          cell += "</div>";
          row1 += "" + cell + "<div class='" + eastClass + "'></div>";
          row2 += "<div class='" + southClass + "'></div><div class='w'></div>";
        }
        html += row1 + "</div>\n" + row2 + "</div>\n";
      }
      html += "\n</div>\n";
    }
    return html;
  };
  return Maze;
})();
Maze.N = 1;
Maze.S = 2;
Maze.E = 4;
Maze.W = 8;
Maze.U = 16;
Maze.D = 32;
Maze.List = [1, 2, 4, 8, 16, 32];
Maze.dx = {
  1: 0,
  2: 0,
  4: 1,
  8: -1,
  16: 0,
  32: 0
};
Maze.dy = {
  1: -1,
  2: 1,
  4: 0,
  8: 0,
  16: 0,
  32: 0
};
Maze.dz = {
  1: 0,
  2: 0,
  4: 0,
  8: 0,
  16: 1,
  32: -1
};
Maze.opposite = {
  1: 2,
  2: 1,
  4: 8,
  8: 4,
  16: 32,
  32: 16
};
Maze.generate = function(id, width, height, depth) {
  var element;
  element = document.getElementById(id);
  element.innerHTML = new Maze(width, height, depth).toHTML();
  return element;
};
showLevel = function(z) {
  var element;
  element = document.getElementById("level_" + z);
  return element.style.display = "inline";
};
hideLevel = function(z) {
  var element;
  element = document.getElementById("level_" + z);
  return element.style.display = "none";
};