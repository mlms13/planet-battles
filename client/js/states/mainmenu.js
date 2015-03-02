function MainMenu() {}

MainMenu.prototype = {
  create: function () {
    var space, fadeIn, title, button, buttonBg;
    space = this.add.sprite(0, 0, 'space');
    space.alpha = 0;

    // create the big title
    title = this.add.bitmapText(this.world.centerX, 100, 'Audiowide Glow', 'Defend The\nPlanet Moon', 64);
    title.alpha = 0;
    title.align = 'center';
    title.updateText();
    title.x = this.world.centerX - (title.textWidth / 2);

    // create the "start game" button
    button = this.add.bitmapText(this.world.centerX, 400, 'Audiowide', 'Start Game', 20);
    button.alpha = 0;
    button.updateText();
    button.x = this.world.centerX - (button.textWidth / 2);
    button.hitArea = new Phaser.Rectangle(-20, -10, button.width + 40, button.height + 20);
    button.inputEnabled = true;
    button.buttonMode = true;

    // add a background for our play again button
    buttonBg = this.add.graphics();
    buttonBg.beginFill(0x999999, 0.1);
    buttonBg.alpha = 0;
    buttonBg.drawRect(button.x - 20, button.y - 10, button.width + 40, button.height + 20);
    buttonBg.endFill();

    button.events.onInputOver.add(function () {
      this.add.tween(buttonBg).to({ alpha: 1 }, 150).start();
    }, this);

    button.events.onInputOut.add(function () {
      this.add.tween(buttonBg).to({ alpha: 0 }, 150).start();
    }, this);

    button.events.onInputDown.add(function () {
      this.state.start('Game');
    }, this);

    // fade everything in, in order
    fadeIn = this.add.tween(space).to({ alpha: 1 }, 500)
    fadeIn.onComplete.add(function () {
      this.add.tween(title).to({ alpha: 1 }, 500).start();
      this.add.tween(button).to({ alpha: 1 }, 500).start();
    }, this);
    fadeIn.start();
  }
};

module.exports = MainMenu;
