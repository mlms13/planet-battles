var Phaser = window.Phaser;

var Bullets = function (game) {
  Phaser.Group.call(this, game);

  this.enableBody = true;
  this.physicsBodyType = Phaser.Physics.ARCADE;

  this._nextBulletsAt = 0;

  // TODO: remove?
  this.setAll('outOfBoundsKill', true);
  this.setAll('checkWorldBounds', true);
};

Bullets.prototype = Object.create(Phaser.Group.prototype);
Bullets.prototype.constructor = Bullets;

Bullets.prototype.fire = function (turrets, speed, lifespan, cooldown) {
  var bullet, turret, i;

  if (this._nextBulletsAt > this.game.time.now) {
    return;
  }

  cooldown = cooldown === undefined ? 100 : cooldown;

  for (i = 0; i < turrets.children.length; i++) {
    turret = turrets.children[i];
    bullet = this.create(turret.x, turret.y, 'bullet');
    bullet.lifespan = lifespan;
    this.game.physics.arcade.velocityFromRotation(turret.rotation, speed, bullet.body.velocity);
  }

  this._nextBulletsAt = this.game.time.now + cooldown;
};

module.exports = Bullets;
