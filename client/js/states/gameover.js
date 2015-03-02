var Planet = require('../entities/planet');

function GameOver() {}

GameOver.prototype = {
  create: function () {
    var space, planet, overlay, message, button, buttonBg;

    // set up this scene to look like the previous one:
    space = this.add.sprite(0, 0, 'space');
    planet = new Planet(this.game, this.world.centerX - 85, this.world.centerY - 85);
    planet.buildings.colony.destroy();
    space.addChild(planet);

    // bring up the overlay
    square = this.add.graphics();
    square.beginFill(0x0, 0.7);
    square.drawRect(0, 0, this.world.width, this.world.height);
    square.endFill();

    // show the "game over" message
    message = this.add.bitmapText(this.world.centerX, 150, 'Audiowide Glow', 'Game Over!', 50);
    message.alpha = 0;
    message.updateText();
    message.x = this.world.centerX - (message.textWidth / 2);
    this.add.tween(message).to({ alpha: 1 }, 300).start();

    // add a button to play again
    button = this.add.bitmapText(this.world.centerX, 400, 'Audiowide', 'Play Again', 20);
    button.alpha = 0;
    button.updateText();
    button.x = this.world.centerX - (button.textWidth / 2);
    button.hitArea = new Phaser.Rectangle(-20, -10, button.width + 40, button.height + 20);
    button.inputEnabled = true;
    button.buttonMode = true;

    // add a background for our play again button
    buttonBg = this.add.graphics();
    buttonBg.beginFill(0x999999, 0.1);
    buttonBg.alpha = 0;
    buttonBg.drawRect(button.x - 20, button.y - 10, button.width + 40, button.height + 20);
    buttonBg.endFill();

    button.events.onInputOver.add(function () {
      this.add.tween(buttonBg).to({ alpha: 1 }, 150).start();
    }, this);

    button.events.onInputOut.add(function () {
      this.add.tween(buttonBg).to({ alpha: 0 }, 150).start();
    }, this);

    button.events.onInputDown.add(function () {
      this.state.start('Game');
    }, this);

    this.add.tween(button).to({ alpha: 1 }, 300).start();
  }
};

module.exports = GameOver;
