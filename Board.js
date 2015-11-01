(function() {
  if(typeof window.LangtonsAnt === "undefined") {
    window.LangtonsAnt = {};
  }

  var LangtonsAnt = window.LangtonsAnt;

  var Board = LangtonsAnt.Board = function(options) {
    this.generation = 0;
    this.antLocation = null;
    this.numX = options.numX;
    this.numY = options.numY;
    this.antLocationColor = null;
    this.prevLocation = null;
    this.grid = [];
    this.generateGrid();
  };

  Board.prototype.generateGrid = function() {
    for(var i=0; i<this.numX; i++) {
      this.grid.push([]);
      for(var j=0; j<this.numY; j++) {
        this.grid[i].push('0');
      }
    }
  };

  Board.prototype.setAntLocation = function(location) {
    this.antLocation = location;
  };

  Board.prototype.step = function() {

  };

  Board.prototype.draw = function(ctx, offset, numSquares, squareSize) {
    var offsetX = (this.numX - Math.floor(numSquares[0] - numSquares[0] % 2)) / 2;
    var offsetY = (this.numY - Math.floor(numSquares[1] - numSquares[1] % 2)) / 2;

    var that = this;

    this.grid.forEach(function(row, i){
      row.forEach(function(cell, j) {
        ctx.fillRect((i - offsetX) * squareSize + offset[0], (j - offsetY) * squareSize + offset[1], squareSize, squareSize);
      })
    })

  }
}());
