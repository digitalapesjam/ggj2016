
class PlayerExampleLevel extends Phaser.State {

  preload() {
    this.game.load.spritesheet('player', 'assets/samurai1.png', 52,86 ,18  );
  }

  create() {
    let center = { x: this.game.world.centerX, y: this.game.world.centerY }
    let player = new Phaser.Sprite(this.game, center.x, center.y,  'player',1);
    this.player = player;
    player.animations.add('walk', [1, 2,3,4,5,6]);
    // player.animations.play('walk', 10, true);

    this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);

    this.game.stage.addChild(player);
    player.anchor.set(0.5);
  }

  update() {
    if(this.upKey.isDown) {
      this.player.animations.play('walk', 10, true);
    }
  }
}

export default PlayerExampleLevel;
