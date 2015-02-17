var Planet = require('../entities/planet');

function Game() {}

Game.prototype = {
  preload: function () {
    this.load.image('space', 'assets/space.png');
    this.load.image('planet', 'assets/planet.png');
  },
  create: function () {
    var i;

    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.add.sprite(0, 0, 'space');
    this.add.sprite(this.world.centerX - 65, this.world.centerY - 65, 'planet');
  },

  update: function () {
  }
};

module.exports = Game;
