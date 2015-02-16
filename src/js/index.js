var Phaser = window.Phaser;

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
});

function preload() {
  game.load.image('space', 'assets/space.png');
  game.load.image('planet', 'assets/planet.png');
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.add.sprite(0, 0, 'space');
  game.add.sprite(game.world.centerX - game.cache.getImage('planet').width / 2, game.world.centerY - game.cache.getImage('planet').height / 2, 'planet');
}

function update() {
  // TODO
}
