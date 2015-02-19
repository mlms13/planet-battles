var Building = require('./building');

function Planet(game, posX, posY) {
  if (!(this instanceof Planet)) { return new Planet(arguments); }

  this.game = game;
  this.pos = {
    x: posX,
    y: posY
  };
  this.buildings = [];
}

Planet.prototype.create = function () {
  this.game.add.sprite(this.pos.x, this.pos.y, 'planet');

  // add a colony
  this.colony = new Building(this.game, 'colony', 0, 0);
  this.buildings.push(this.colony);
};

module.exports = Planet;
