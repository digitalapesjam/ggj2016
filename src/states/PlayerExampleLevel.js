
class PlayerExampleLevel extends Phaser.State {

    preload() {
        this.game.load.image('player', 'assets/samurai.png');
    }

	create() {
        let center = { x: this.game.world.centerX, y: this.game.world.centerY }
        // let playerImg = new Phaser.Image(this.game, '/assets/samurai.png','player' )
        let player = new Phaser.Sprite(this.game, center.x, center.y,  'player');
        // console.log('this.game.stage ',this.game.stage.addChild);
        this.game.stage.addChild(player);
        // let text = new RainbowText(this.game, center.x, center.y, "Start Menu");
		player.anchor.set(0.5);
	}
}

export default PlayerExampleLevel;
