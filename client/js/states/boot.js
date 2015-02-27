function Boot() {}

Boot.prototype = {
  preload: function () {
    // start loading the rest of the assets
    this.load.image('preloader', 'assets/preloader.png');
  },
  create: function () {
    this.game.state.start('Preloader');
  }
};

module.exports = Boot;
