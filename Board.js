(function() {
  if(typeof window.LangtonsAnt === "undefined") {
    window.LangtonsAnt = {};
  }

  var LangtonsAnt = window.LangtonsAnt;

  var Board = LangtonsAnt.Board = function(options) {
    this.generation = 0;
    this.antLocation = [50, 50];
    this.antDirection = [0, 1];
    this.ants = [];
    this.numX = options.numX;
    this.numY = options.numY;
    this.antLocationColor = null;
    this.prevLocation = null;
    this.grid = [];
    this.colorNumber = 4;
    this.mode = "paused";
    this.colors = ["#222", "#4b0082", "#0000cd", "#008000", "#ffff00", "#ff4500", "#ff0000", "#800080"]
    this.generateGrid();
  };

  Board.prototype.generateGrid = function() {
    for(var i=0; i<this.numX; i++) {
      this.grid.push([]);
      for(var j=0; j<this.numY; j++) {
        this.grid[i].push(0);
      }
    }
  };

  Board.prototype.setAntLocation = function(location) {
    this.grid[location[0]][location[1]] = 1;
    var ant = new LangtonsAnt.Ant({location: location, board: this});
    this.ants.push(ant);
  };

  Board.prototype.step = function() {
    this.generation += 1;
    this.ants.forEach(function(ant) {
      ant.step();
    })
  };

  Board.prototype.draw = function(ctx, offset, numSquares, squareSize) {
    var offsetX = (this.numX - Math.floor(numSquares[0] - numSquares[0] % 2)) / 2;
    var offsetY = (this.numY - Math.floor(numSquares[1] - numSquares[1] % 2)) / 2;

    var that = this;

    this.grid.forEach(function(row, i){
      row.forEach(function(cell, j) {
        ctx.fillStyle = that.colors[that.grid[i][j]];
        ctx.fillRect((i - offsetX) * squareSize + offset[0], (j - offsetY) * squareSize + offset[1], squareSize, squareSize);

        // if(that.antLocation[0] === i && that.antLocation[1] === j) {
        //   ctx.font = "8px Arial";
        //   ctx.strokeText("A", (i - offsetX) * squareSize + offset[0] + squareSize/10, (j - offsetY) * squareSize + offset[1] + squareSize*0.9);
        //
        // }
      })
    })

  };

  Board.prototype.reset = function() {
    this.ants = [];
    this.grid = [];
    this.generation = 0;
    this.generateGrid();
  }
}());
