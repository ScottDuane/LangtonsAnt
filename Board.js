(function() {
  if(typeof window.LangtonsAnt === "undefined") {
    window.LangtonsAnt = {};
  }

  var LangtonsAnt = window.LangtonsAnt;

  var Board = LangtonsAnt.Board = function(options) {
    this.generation = 0;
    this.antLocation = [50, 50];
    this.antDirection = [0, 1];
    this.numX = options.numX;
    this.numY = options.numY;
    this.antLocationColor = null;
    this.prevLocation = null;
    this.grid = [];
    this.colorNumber = 2;
    this.colors = ["#ddd", "#d0d"]
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
  //  this.grid[this.antLocation[0]][this.antLocation[1]] = '0';
    this.antLocation = location;
  //  this.grid[location[0]][location[1]] = 'A';
  };

  Board.prototype.step = function() {
    // record color of ant location
    // record ant direction
    var oldColor = this.grid[this.antLocation[0]][this.antLocation[1]];
    this.grid[this.antLocation[0]][this.antLocation[1]] = (oldColor + 1) % this.colorNumber;
    var newDirection = null;
    if(oldColor % 2 === 0) {
      if(this.antDirection[0] === 1 && this.antDirection[1] === 0) {
        newDirection = [0,-1];
      } else if (this.antDirection[0] === 0 && this.antDirection[1] === 1) {
        newDirection = [1, 0];
      } else if (this.antDirection[0] === -1 && this.antDirection[1] === 0) {
        newDirection = [0, 1];
      } else if (this.antDirection[0] === 0 && this.antDirection[1] === -1) {
        newDirection = [-1, 0];
      }
    } else {
      if(this.antDirection[0] === 1 && this.antDirection[1] === 0) {
        newDirection = [0, 1];
      } else if (this.antDirection[0] === 0 && this.antDirection[1] === 1) {
        newDirection = [-1, 0];
      } else if (this.antDirection[0] === -1 && this.antDirection[1] === 0) {
        newDirection = [0, -1];
      } else if (this.antDirection[0] === 0 && this.antDirection[1] === -1) {
        newDirection = [1, 0];
      }
    }

    this.antDirection = newDirection;
    this.antLocation[0] += this.antDirection[0];
    this.antLocation[1] += this.antDirection[1];
    // use color of ant location to decide where to move next
    // change color of ant location
    // change ant direction


  };

  Board.prototype.draw = function(ctx, offset, numSquares, squareSize) {
    var offsetX = (this.numX - Math.floor(numSquares[0] - numSquares[0] % 2)) / 2;
    var offsetY = (this.numY - Math.floor(numSquares[1] - numSquares[1] % 2)) / 2;

    var that = this;
    // console.log(this.antLocation);
    this.grid.forEach(function(row, i){
      row.forEach(function(cell, j) {
        ctx.fillStyle = that.colors[that.grid[i][j]];
        ctx.fillRect((i - offsetX) * squareSize + offset[0], (j - offsetY) * squareSize + offset[1], squareSize, squareSize);

        // debugger;
        if(that.antLocation[0] === i && that.antLocation[1] === j) {
          ctx.font = "8px Arial";
          ctx.strokeText("A", (i - offsetX) * squareSize + offset[0] + squareSize/10, (j - offsetY) * squareSize + offset[1] + squareSize*0.9);

        }
      })
    })

  }
}());
