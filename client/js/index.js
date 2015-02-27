var Phaser = window.Phaser;

var game = new Phaser.Game(800, 600, Phaser.AUTO);

game.state.add('Boot', require('./states/boot'));
game.state.add('Game', require('./states/game'));
game.state.start('Boot');
