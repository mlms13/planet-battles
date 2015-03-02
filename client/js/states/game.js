var Planet = require('../entities/planet');
var Attacks = require('../entities/attacks');

function Game() {}

var planet;
var attacks;
var explosions;
var fireButton;
var nextAttackAt;
var elapsed;
var timer;

Game.prototype = {
  _prepareExplosions: function () {
    explosions = this.add.group();
    explosions.enableBody = true;
    explosions.physicsBodyType = Phaser.Physics.ARCADE;
    explosions.createMultiple(20, 'explosion');
    explosions.setAll('anchor.x', 0.5);
    explosions.setAll('anchor.y', 0.5);
    explosions.forEach(function (explosion) {
      explosion.animations.add('explosion');
    });
  },

  _damageMissile: function (bullet, missile) {
    var explosion;
    missile.damage(1);
    bullet.kill();

    if (!missile.alive) {
      explosion = explosions.getFirstExists(false);
      explosion.reset(missile.body.x + 20, missile.body.y);
      explosion.body.velocity.x = missile.body.velocity.x;
      explosion.body.velocity.y = missile.body.velocity.y;
      explosion.play('explosion', 24, false, true);
    }
  },

  _damageColony: function (colony, missile) {
    var square, fadeOut;
    colony.damage(1);
    missile.kill();

    // if no more colony, switch show "game over" message
    if (!colony.alive) {
      attacks.destroy();

      // draw a mostly-opaque black box over the game
      square = this.add.graphics();
      square.beginFill(0x0, 1);
      square.alpha = 0;
      square.drawRect(0, 0, this.world.width, this.world.height);
      square.endFill();

      // tween it good
      fadeOut = this.add.tween(square).to({ alpha: 0.7 }, 500);

      fadeOut.onComplete.add(function () {
        this.state.start('Game Over', true, false, elapsed);
      }, this);
      fadeOut.start();
    }
  },

  _updateTime: function () {
    var min = Math.floor(elapsed / 60),
        sec = elapsed - (min * 60),
        str = min + " min " + sec.toFixed(1) + " sec";

    timer.text = str;
  },

  create: function () {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // (re)set timers
    nextAttackAt = 0;
    elapsed = 0;

    var space = this.add.sprite(0, 0, 'space');
    planet = new Planet(this.game, this.world.centerX - 85, this.world.centerY - 85);
    space.addChild(planet);

    this._prepareExplosions();

    nextAttackAt = this.time.now + 200;
    attacks = new Attacks(this.game);

    timer = this.add.bitmapText(32, 32, 'Audiowide', '', 20);
  },

  update: function () {
    var attackInterval;

    if (!planet.buildings.colony.alive) {
      return;
    }

    // never allow more than 250ms to be added per frame
    // which happens when you blur, then re-focus the tab
    elapsed += Math.min(this.time.elapsed / 1000, 0.25);
    this._updateTime();

    // handle collisions
    this.physics.arcade.overlap(planet.buildings.colony, attacks, this._damageColony, null, this);
    this.physics.arcade.overlap(planet.bullets, attacks, this._damageMissile, null, this);

    planet.buildings.turrets.children.forEach(function (turret) {
      turret.rotation = Phaser.Point.angle(this.input, turret.world);
    }, this);

    if (fireButton.isDown) {
      planet.fireBullets(400, 1000);
    }

    if (nextAttackAt < this.time.now) {
      console.log('adding attack, headed for', planet.buildings.colony.world);
      attacks.addRandom(planet.buildings.colony.world, 50);

      // set the timer for the next attack so that attacks increase in frequency
      // over time, but have randomness within 1 second
      attackInterval = 40 / (elapsed + 8);
      nextAttackAt = this.time.now + 1000 * (attackInterval + Math.random());
    }
  }
};

module.exports = Game;
