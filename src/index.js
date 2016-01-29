import {GameState,StartMenu } from './states';
import * as states from './constants/states';

class Game extends Phaser.Game {

	constructor() {
		super(500, 500, Phaser.AUTO, 'content', null);
		this.state.add(states.StartMenu, StartMenu, false);
		this.state.add(states.GameState, GameState, false);
		this.state.start(states.StartMenu);
	}

}

new Game();
