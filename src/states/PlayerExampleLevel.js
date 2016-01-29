
class PlayerExampleLevel extends Phaser.State {

    preload() {
        // this.game.load.image('player', 'assets/samurai1.png', 57,86 ,18  );
        this.game.load.spritesheet('player', 'assets/samurai1.png', 52,86 ,18  );
    }

	create() {
        let center = { x: this.game.world.centerX, y: this.game.world.centerY }
        // let playerImg = new Phaser.Image(this.game, '/assets/samurai.png','player' )
        let player = new Phaser.Sprite(this.game, center.x, center.y,  'player',1);
        player.animations.add('walk', [1, 2,3,4,5,6]);
        player.animations.play('walk', 10, true);




        // let player = new Player(this.game, center.x, center.y);

        // console.log('this.game.stage ',this.game.stage.addChild);
        this.game.stage.addChild(player);
        // let text = new RainbowText(this.game, center.x, center.y, "Start Menu");
		player.anchor.set(0.5);
	}
}

export default PlayerExampleLevel;
