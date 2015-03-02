var Planet = require('../entities/planet');
var Attacks = require('../entities/attacks');

function Game() {}

var planet;
var attacks;
var fireButton;
var nextAttackAt = 0;

Game.prototype = {
  _damageMissile: function (bullet, missile) {
    missile.damage(1);
    bullet.kill();
  },

  _damageColony: function (colony, missile) {
    var square, fadeOut;
    colony.damage(1);
    missile.kill();

    // if no more colony, switch show "game over" message
    if (!colony.alive) {
      this.input.keyboard.enabled = false;
      attacks.destroy();

      // draw a mostly-opaque black box over the game
      square = this.add.graphics();
      square.beginFill(0x0, 1);
      square.alpha = 0;
      square.drawRect(0, 0, this.world.width, this.world.height);

      // tween it good
      fadeOut = this.add.tween(square).to({ alpha: 0.7 }, 800);

      fadeOut.onComplete.add(function () {
          var message = this.add.bitmapText(this.world.centerX, 250, 'audiowide', '', 50);
          message.text = "Game Over!";
          message.updateText();
          message.x = this.world.centerX - (message.textWidth / 2);
        }, this);

      fadeOut.start();
    }
  },

  create: function () {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    var space = this.add.sprite(0, 0, 'space');
    planet = new Planet(this.game, this.world.centerX - 85, this.world.centerY - 85);
    space.addChild(planet);

    nextAttackAt = this.time.now + 200;

    attacks = new Attacks(this.game);
  },

  update: function () {
    var attackInterval;

    // handle collisions
    this.physics.arcade.overlap(planet.buildings.colony, attacks, this._damageColony, null, this);
    this.physics.arcade.overlap(planet.bullets, attacks, this._damageMissile, null, this);

    planet.buildings.turrets.children.forEach(function (turret) {
      turret.rotation = Phaser.Point.angle(this.input, turret.world);
    }, this);

    if (fireButton.isDown) {
      planet.fireBullets(400, 1000);
    }

    if (planet.buildings.colony.alive && nextAttackAt < this.time.now) {
      console.log('adding attack, headed for', planet.buildings.colony.world);
      attacks.addRandom(planet.buildings.colony.world, 50);

      // set the timer for the next attack so that attacks increase in frequency
      // over time, but have randomness within 1 second
      attackInterval = 40 / (this.time.totalElapsedSeconds() + 8);
      nextAttackAt = this.time.now + 1000 * (attackInterval + Math.random());
    }
  },

  render: function () {
    this.game.debug.text("Elapsed time: " + this.time.totalElapsedSeconds().toFixed(1), 32, 32);
    // this.game.debug.quadTree(this.physics.arcade.quadTree);
    // attacks.children.forEach(function (missile) {
    //   this.game.debug.body(missile);
    // }, this);
    // this.game.debug.body(buildings.colony);
  }
};

module.exports = Game;
