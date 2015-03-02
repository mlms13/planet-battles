var Phaser = window.Phaser;

var game = new Phaser.Game(800, 600, Phaser.AUTO);

game.state.add('Boot', require('./states/boot'));
game.state.add('Preloader', require('./states/preloader'));
game.state.add('Main Menu', require('./states/mainmenu'));
game.state.add('Game', require('./states/game'));
game.state.add('Game Over', require('./states/gameover'));
game.state.start('Boot');
