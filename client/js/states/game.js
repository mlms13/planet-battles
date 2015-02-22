function Game() {}

var buildings = {};
var fireButton;
var bullets;

Game.prototype = {
  preload: function () {
    this.load.image('space', 'assets/space.png');
    this.load.image('planet', 'assets/planet.png');
    this.load.image('colony', 'assets/colony.png');
    this.load.image('turret', 'assets/turret.png');
    this.load.image('bullet', 'assets/bullet.png');
  },

  _prepareBullets: function () {
    bullets = this.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);
  },

  _fireBullets: function (turrets, speed, lifespan) {
    var bullet;

    turrets.children.forEach(function (turret) {
      bullet = bullets.create(turret.x, turret.y, 'bullet');
      bullet.lifespan = lifespan;
      this.physics.arcade.velocityFromRotation(turret.rotation, speed, bullet.body.velocity);
    }, this);
  },

  _createTurrets: function (howMany, radius, offset) {
    var turrets, sprite, angle, turretX, turretY, i;

    turrets = this.add.group();

    for (i = 0; i < howMany; i++) {
      angle = 360 / howMany;
      turretX = Math.cos(i * angle * (Math.PI / 180)) * radius + offset;
      turretY = Math.sin(i * angle * (Math.PI / 180)) * radius + offset;
      sprite = turrets.create(turretX, turretY, 'turret');
      sprite.anchor.setTo(0.2, 0.5);
    }

    this._prepareBullets();
    return turrets;
  },

  _createPlanet: function (posX, posY) {
    var planet = this.add.sprite(posX, posY, 'planet');
    var planetRadius = planet.width / 2;

    // create colony
    buildings.colony = this.add.sprite(planetRadius, planetRadius, 'colony');
    buildings.colony.anchor.setTo(0.5);
    planet.addChild(buildings.colony);

    // creat turrets
    buildings.turrets = this._createTurrets(3, planetRadius - 10, planetRadius);
    planet.addChild(buildings.turrets);
    planet.addChild(bullets);

    return planet;
  },

  create: function () {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    var space = this.add.sprite(0, 0, 'space');
    var planet = this._createPlanet(this.world.centerX - 65, this.world.centerY - 65);
    space.addChild(planet);
  },

  update: function () {
    buildings.turrets.children.forEach(function (turret) {
      turret.rotation = Phaser.Point.angle(this.input, turret.world);
    }, this);

    if (fireButton.isDown) {
      this._fireBullets(buildings.turrets, 300, 1000);
    }
  }
};

module.exports = Game;
