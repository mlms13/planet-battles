function Game() {}

var space;
var planet;

Game.prototype = {
  preload: function () {
    this.load.image('space', 'assets/space.png');
    this.load.image('planet', 'assets/planet.png');
    this.load.image('colony', 'assets/colony.png');
  },

  _createPlanet: function (posX, posY) {
    var planet = this.add.sprite(posX, posY, 'planet');
    var buildings = this.add.group();
    buildings.colony = buildings.create(planet.width / 2, planet.height / 2, 'colony');
    buildings.colony.anchor.setTo(0.5);

    planet.addChild(buildings);
    return planet;
  },

  create: function () {
    var i;

    this.physics.startSystem(Phaser.Physics.ARCADE);

    space = this.add.sprite(0, 0, 'space');
    planet = this._createPlanet(this.world.centerX - 65, this.world.centerY - 65);
    space.addChild(planet);
  },

  update: function () {
  }
};

module.exports = Game;
