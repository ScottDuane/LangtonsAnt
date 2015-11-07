(function() {
  if(typeof window.LangtonsAnt === "undefined") {
    window.LangtonsAnt = {};
  }

  var LangtonsAnt = window.LangtonsAnt;

  var Ant = LangtonsAnt.Ant = function(antOptions) {
    this.location = antOptions.location;
    this.board = antOptions.board;
    this.direction = [0, -1];
    this.active = true;
  };

  Ant.prototype.step = function() {
    if (!this.active) {
      return;
    }

    var oldColor = this.board.grid[this.location[0]][this.location[1]];
    this.board.grid[this.location[0]][this.location[1]] = (oldColor + 1) % this.board.colorNumber;
    var newDirection = null;
    if(oldColor % 2 === 0) {
      if(this.direction[0] === 1 && this.direction[1] === 0) {
        newDirection = [0,-1];
      } else if (this.direction[0] === 0 && this.direction[1] === 1) {
        newDirection = [1, 0];
      } else if (this.direction[0] === -1 && this.direction[1] === 0) {
        newDirection = [0, 1];
      } else if (this.direction[0] === 0 && this.direction[1] === -1) {
        newDirection = [-1, 0];
      }
    } else {
      if(this.direction[0] === 1 && this.direction[1] === 0) {
        newDirection = [0, 1];
      } else if (this.direction[0] === 0 && this.direction[1] === 1) {
        newDirection = [-1, 0];
      } else if (this.direction[0] === -1 && this.direction[1] === 0) {
        newDirection = [0, -1];
      } else if (this.direction[0] === 0 && this.direction[1] === -1) {
        newDirection = [1, 0];
      }
    }

    if(this.board.inBounds(this.location[0]+this.direction[0], this.location[1]+this.direction[1])) {
      this.direction = newDirection;
      this.location[0] += this.direction[0];
      this.location[1] += this.direction[1];
    } else {
      this.active = false;
    }

  }
}());
