var Phaser = window.Phaser;

var Attacks = function (game) {
  Phaser.Group.call(this, game);

  this.enableBody = true;
  this.physicsBodyType = Phaser.Physics.ARCADE;
};

Attacks.prototype = Object.create(Phaser.Group.prototype);
Attacks.prototype.constructor = Attacks;

Attacks.prototype.add = function (origin, target, speed) {
  var missile = this.create(origin.x, origin.y, 'missile');
  missile.anchor.setTo(0.5);
  missile.health = 10;
  missile.rotation = Phaser.Point.angle(target, origin);
  missile.body.velocity = this.game.physics.arcade.velocityFromRotation(missile.rotation, speed);
};

Attacks.prototype.addRandom = function (target, speed) {
  var x = Math.floor(Math.random() * this.game.world.width),
      y = Math.floor(Math.random() * this.game.world.height);

  if (Math.random() > 0.5) {
    // keep x width and move y to perimeter
    y = (y / this.game.world.height > 0.5) ? this.game.world.height : 0;
  } else {
    x = (x / this.game.world.width > 0.5) ? this.game.world.width : 0;
  }
  this.add({ x: x, y: y }, target, speed);
};

module.exports = Attacks;
