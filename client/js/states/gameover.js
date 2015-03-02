var Planet = require('../entities/planet');

function GameOver() {}

GameOver.prototype = {
  create: function () {
    var space, planet, overlay, message;

    // set up this scene to look like the previous one:
    space = this.add.sprite(0, 0, 'space');
    planet = new Planet(this.game, this.world.centerX - 85, this.world.centerY - 85);
    planet.buildings.colony.destroy();
    space.addChild(planet);

    // bring up the overlay
    square = this.add.graphics();
    square.beginFill(0x0, 0.7);
    square.drawRect(0, 0, this.world.width, this.world.height);

    // and show the message
    message = this.add.bitmapText(this.world.centerX, 250, 'audiowide', '', 50);
    message.text = "Game Over!";
    message.updateText();
    message.x = this.world.centerX - (message.textWidth / 2);
  }
};

module.exports = GameOver;
