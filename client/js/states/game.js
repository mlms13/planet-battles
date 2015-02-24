var Planet = require('../entities/planet');

function Game() {}

var planet;
var fireButton;
var attacks;
var nextAttackAt = 0;

Game.prototype = {
  preload: function () {
    this.load.image('space', 'assets/space.png');
    this.load.image('planet', 'assets/planet.png');
    this.load.image('colony', 'assets/colony.png');
    this.load.image('turret', 'assets/turret.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('missile', 'assets/missile.png');
  },

  _prepareAttacks: function () {
    attacks = this.add.group();
    attacks.enableBody = true;
    attacks.physicsBodyType = Phaser.Physics.ARCADE;
  },

  _addIncomingAttack: function (origin, speed) {
    var missile = attacks.create(origin.x, origin.y, 'missile');
    missile.anchor.setTo(0.5);
    missile.health = 10;
    missile.rotation = Phaser.Point.angle(planet.buildings.colony.world, missile.world);
    missile.body.velocity = this.physics.arcade.velocityFromRotation(missile.rotation, speed);
  },

  _generateIncomingAttack: function () {
    var attackInterval,
        x = Math.floor(Math.random() * this.world.width),
        y = Math.floor(Math.random() * this.world.height);

    if (Math.random() > 0.5) {
      // keep x width and move y to perimeter
      y = (y / this.world.height > 0.5) ? this.world.height : 0;
    } else {
      x = (x / this.world.width > 0.5) ? this.world.width : 0;
    }
    this._addIncomingAttack({ x: x, y: y }, 50);

    // set the timer for the next attack so that attacks increase in frequency
    // over time, but have randomness within 1 second
    attackInterval = 40 / (this.time.totalElapsedSeconds() + 8);
    nextAttackAt = this.time.now + 1000 * (attackInterval + Math.random());
  },

  _damageMissile: function (bullet, missile) {
    missile.damage(1);
    bullet.kill();
  },

  _damageColony: function (colony, missile) {
    colony.damage(1);
    missile.kill();

    // TODO: if no more colony, switch state to game over
  },

  create: function () {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.physics.arcade.skipQuadTree = false;
    fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    var space = this.add.sprite(0, 0, 'space');
    planet = new Planet(this.game, this.world.centerX - 65, this.world.centerY - 65);
    space.addChild(planet);

    this._prepareAttacks();
  },

  update: function () {
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
      this._generateIncomingAttack();
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
