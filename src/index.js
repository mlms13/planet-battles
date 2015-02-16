var Phaser = window.Phaser;

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update,
  render: render
});

var planet;

function preload() {
  game.load.image('space', 'assets/space.png');
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.add.sprite(0, 0, 'space');
  planet = new Phaser.Circle(game.world.centerX, game.world.centerY, 130);
}

function update() {
  // TODO
}

function render() {
  game.debug.geom(planet, '#662211');
}
