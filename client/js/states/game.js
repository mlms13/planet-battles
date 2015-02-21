function Game() {}

var space;
var planet;
var turrets = [];

Game.prototype = {
  preload: function () {
    this.load.image('space', 'assets/space.png');
    this.load.image('planet', 'assets/planet.png');
    this.load.image('colony', 'assets/colony.png');
    this.load.image('turret', 'assets/turret.png');
  },

  _addTurrets: function (group, howMany, radius, offset) {
    var sprite, angle, turretX, turretY, i;

    for (i = 0; i < howMany; i++) {
      angle = 360 / howMany;
      turretX = Math.cos(i * angle * (Math.PI / 180)) * radius + offset;
      turretY = Math.sin(i * angle * (Math.PI / 180)) * radius + offset;
      sprite = group.create(turretX, turretY, 'turret');
      sprite.anchor.setTo(0.2, 0.5);
      turrets.push(sprite);
    }
  },

  _createPlanet: function (posX, posY) {
    var planet = this.add.sprite(posX, posY, 'planet');
    var planetRadius = planet.width / 2;
    var buildings = this.add.group();
    buildings.colony = buildings.create(planetRadius, planetRadius, 'colony');
    buildings.colony.anchor.setTo(0.5);

    this._addTurrets(buildings, 3, planetRadius - 10, planetRadius);

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
    turrets.forEach(function (turret) {
      turret.rotation = Phaser.Point.angle(this.input, turret.world);
    }, this);
  }
};

module.exports = Game;
