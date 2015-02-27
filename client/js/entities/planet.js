var Phaser = window.Phaser;
var Bullets = require('./bullets');

var Planet = function (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'planet');

  this.radius = this.width / 2;
  this.buildings = {};

  this._addColony(this.radius, this.radius);
  this._addTurrets(3, this.radius - 30, this.radius);
  this.addBullets();
};

Planet.prototype = Object.create(Phaser.Sprite.prototype);
Planet.prototype.constructor = Planet;

Planet.prototype.fireBullets = function (speed, lifespan, cooldown) {
  this.bullets.fire(this.buildings.turrets, speed, lifespan, cooldown);
};

Planet.prototype._addColony = function (x, y) {
  this.buildings.colony = this.game.add.sprite(x, y, 'colony');
  this.game.physics.enable(this.buildings.colony, Phaser.Physics.ARCADE);
  this.buildings.colony.anchor.setTo(0.5);
  this.addChild(this.buildings.colony);
};

Planet.prototype._addTurrets = function (howMany, radius, offset) {
  var sprite, angle, turretX, turretY, i;

  this.buildings.turrets = this.game.add.group();
  this.addChild(this.buildings.turrets);

  for (i = 0; i < howMany; i++) {
    angle = 360 / howMany;
    turretX = Math.cos(i * angle * (Math.PI / 180)) * radius + offset;
    turretY = Math.sin(i * angle * (Math.PI / 180)) * radius + offset;
    sprite = this.buildings.turrets.create(turretX, turretY, 'turret');
    sprite.anchor.setTo(0.2, 0.5);
  }
};

Planet.prototype.addBullets = function () {
  this.bullets = new Bullets(this.game);
  this.addChild(this.bullets);
};

module.exports = Planet;
