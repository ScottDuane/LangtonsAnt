(function(){
  if (typeof window.LangtonsAnt === "undefined") {
    var LangtonsAnt = window.LangtonsAnt = {};
  }

  var LangtonsAnt = window.LangtonsAnt;

  var Menu = LangtonsAnt.Menu = function (options) {
    this.board = options.board;
    var $body = $('body');
    this.$startButton = $body.find('.start-button');
    this.$stopButton = $body.find('.stop-button');
    this.$stepButton = $body.find('.step-button');
    this.$resetButton = $body.find('.reset-button');
    this.$instructionsButton = $body.find('.instructions-button');
    this.$zoomBar = $body.find('#zoom-bar');
    this.$speedBar = $body.find('#speed-bar');
    this.$numColorsBar = $body.find('#color-range');
    this.$generationCounter = $body.find('.counter');
    this.$instructBackground = $body.find('.instructions-container');
    this.timerId = null;
    this.mode = "paused";
    this.speed = 100;
    this.bindClickHandlers();
  };

  Menu.prototype.bindClickHandlers = function () {

    this.$startButton.click(this.startGame.bind(this));
    this.$stopButton.click(this.stopGame.bind(this));
    this.$stepButton.click(this.stepGame.bind(this));
    this.$resetButton.click(this.resetGame.bind(this));
    this.$numColorsBar.change(this.changeNumColors.bind(this));
    this.$numColorsBar.on('keyup', this.changeNumColors.bind(this));
    this.$instructBackground.click(this.hideInstructions.bind(this));
    // this.$placeAntButton.click(this.toggleAntPlacement.bind(this));
    // this.

    this.$instructionsButton.click(this.showInstructions.bind(this));
    this.$speedBar.on('input', this.changeSpeed.bind(this));
  };

  Menu.prototype.startGame = function () {

    if (this.mode !== "running") {
      this.board.mode = "running";
      this.mode = "running";
      if(this.board.ants.length === 0) {
        this.board.setAntLocation([50, 50]);
      }
      this.timerId = setInterval(this.runGame.bind(this), this.speed);
    }
  };

  Menu.prototype.runGame = function () {
    this.board.step();
    $('.counter').text(this.board.generation);
  };

  Menu.prototype.stopGame = function () {
    if (this.mode !== "paused") {
      this.board.mode = "paused";
      this.mode = "paused";
      window.clearInterval(this.timerId);
    }
  };

  Menu.prototype.stepGame = function () {
    if (this.mode !== "running") {
      this.board.step();
      $('.counter').text(this.board.generation);
    }
  };

  Menu.prototype.resetGame = function () {
    this.board.mode = "paused";
    this.mode = "paused";
    window.clearInterval(this.timerId);
    this.board.reset();
  };

  Menu.prototype.changeSpeed = function () {
    var newSpeed = this.$speedBar.val();
    this.speed = 3000/newSpeed;
    $('.speed').text(this.speed);
    if (this.mode === "running") {
      window.clearInterval(this.timerId);
      this.timerId = setInterval(this.runGame.bind(this), this.speed);
    }
  };

  Menu.prototype.changeNumColors = function (event) {
    var newNumColors = this.$numColorsBar.val();
    $('#num-colors-status').text(newNumColors);
    this.board.mode = "paused";
    this.mode = "paused";
    this.board.colorNumber = parseInt(newNumColors);
    window.clearInterval(this.timerId);
    this.board.reset();
  };

  Menu.prototype.showInstructions = function () {

    $('.instructions-container').attr('id', 'instructing');
    // debugger
  };

  Menu.prototype.hideInstructions = function() {
    $('.instructions-container').attr('id', null);
  }

})();
