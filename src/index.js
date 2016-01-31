import GameState from 'states/GameState';
import GameOverState from 'states/GameOver';


class Game extends Phaser.Game {

	constructor() {
		super(800, 600, Phaser.AUTO, 'content', null);
		this.state.add('GameState', GameState, false);
    this.state.add('GameOver', GameOverState, false);
		this.state.start('GameState');
	}

}

new Game();
