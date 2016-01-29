import {GameState,StartMenu } from './states';

class Game extends Phaser.Game {

	constructor() {
		super(500, 500, Phaser.AUTO, 'content', null);
		this.state.add('StartMenu', StartMenu, false);
		this.state.start('StartMenu');
	}

}

new Game();
