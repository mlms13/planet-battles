function Boot() {}

Boot.prototype = {
  preload: function () {
    // start loading the rest of the assets
    this.load.image('space', 'assets/space.png');
    this.load.image('planet', 'assets/planet.png');
    this.load.image('colony', 'assets/colony.png');
    this.load.image('turret', 'assets/turret.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('missile', 'assets/missile.png');
  },
  create: function () {
    this.game.state.start('Game');
  }
};

module.exports = Boot;
