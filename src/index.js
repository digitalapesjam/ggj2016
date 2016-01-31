import GameState from 'states/GameState';
import GameOver from 'states/GameOver';


class Game extends Phaser.Game {

	constructor() {
		super(800, 600, Phaser.AUTO, 'content', null);
		this.state.add('GameState', GameState, false);
    this.state.add('GameOver', GameOver, false);
    this.state.start('GameState');
    // this.state.start('GameOver');
	}

}

new Game();
