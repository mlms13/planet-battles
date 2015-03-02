function Preloader() {}

Preloader.prototype = {
  preload: function () {
    // set up the preload bar
    this.preloadBar = this.add.sprite(this.world.centerX - 150, this.world.centerY - 4, 'preloader');
    this.load.setPreloadSprite(this.preloadBar);

    // start loading the rest of the assets
    this.load.image('space', 'assets/space.png');
    this.load.image('planet', 'assets/planet.png');
    this.load.image('colony', 'assets/colony.png');
    this.load.image('turret', 'assets/turret.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('missile', 'assets/missile.png');
    this.load.bitmapFont('audiowide', 'assets/audiowide/font.png', 'assets/audiowide/font.fnt');
  },
  create: function () {
    this.game.state.start('Game');
  }
};

module.exports = Preloader;
