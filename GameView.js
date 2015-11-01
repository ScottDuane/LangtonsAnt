(function() {
  if(typeof window.LangtonsAnt === "undefined") {
    window.LangtonsAnt = {};
  }

  var LangtonsAnt = window.LangtonsAnt;

  var View = LangtonsAnt.View = function (board) {
    this.board = board;
    this.start();
    this.canvas = document.getElementsByTagName('canvas')[0];
    this.ctx = this.canvas.getContext("2d");
    this.squareSize = 10;
    this.numX = View.CANVAS_DIM_X / this.squareSize;
    this.numY = View.CANVAS_DIM_Y / this.squareSize;
    this.bindEvents();
  };

  View.CANVAS_DIM_X = 1000;
  View.CANVAS_DIM_Y = 600;
  View.ACTIVE_COLOR = '#ff0';
  View.BG_COLOR = "#ddd";
  View.LINE_COLOR = "#999";

  View.prototype.bindEvents = function() {

  }

  View.prototype.start = function() {
    var that = this;
    setInterval(function() {
      that.draw();
    }, 10)
  };

  View.prototype.draw = function () {
    this.ctx.clearRect(0, 0, View.CANVAS_DIM_X, View.CANVAS_DIM_Y);
    this.ctx.fillStyle = View.BG_COLOR;
    this.ctx.fillRect(0, 0, View.CANVAS_DIM_X, View.CANVAS_DIM_Y);

    this.ctx.fillStyle = View.ACTIVE_COLOR;

    var offset = [];
    offset[0] = ((this.numX) % 2) / 2 * this.squareSize;
    offset[1] = ((this.numY) % 2) / 2 * this.squareSize;

    this.board.draw(this.ctx, offset, [this.numX, this.numY] , this.squareSize);
    this.drawLines(offset);
  };

  View.prototype.drawLines = function(offset) {
    this.ctx.fillStyle = View.LINE_COLOR;

    for (var i = 0; i < this.numX; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.squareSize*i + offset[0], 0);
      this.ctx.lineTo(this.squareSize*i + offset[0], View.CANVAS_DIM_Y);
      this.ctx.stroke();
    }

    for (var j = 0; j < this.numY; j++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, this.squareSize*j+offset[1]);
      this.ctx.lineTo(View.CANVAS_DIM_X, this.squareSize*j+offset[1]);
      this.ctx.stroke();
    }
  }
}());
