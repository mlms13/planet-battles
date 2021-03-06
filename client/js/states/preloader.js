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
    this.load.image('missile2', 'assets/missile_green.png');
    this.load.spritesheet('explosion', 'assets/explosion.png', 64, 64);
    this.load.bitmapFont('Audiowide Glow', 'assets/audiowide/glow.png', 'assets/audiowide/glow.fnt');
    this.load.bitmapFont('Audiowide', 'assets/audiowide/small.png', 'assets/audiowide/small.fnt');
  },
  create: function () {
    this.game.state.start('Main Menu');
  }
};

module.exports = Preloader;
