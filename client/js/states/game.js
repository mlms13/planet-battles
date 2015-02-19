function Game() {}

var space;
var planet;

Game.prototype = {
  preload: function () {
    this.load.image('space', 'assets/space.png');
    this.load.image('planet', 'assets/planet.png');
    this.load.image('colony', 'assets/colony.png');
  },

  create: function () {
    var i;

    this.physics.startSystem(Phaser.Physics.ARCADE);

    space = this.add.sprite(0, 0, 'space');
    planet = this.add.sprite(this.world.centerX - 65, this.world.centerY - 65, 'planet');
    space.addChild(planet);

    planet.buildings = this.add.group();
    planet.buildings.create(planet.width / 2, planet.height / 2, 'colony');
    planet.addChild(planet.buildings);
  },

  update: function () {
  }
};

module.exports = Game;
