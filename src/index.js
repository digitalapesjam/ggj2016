import * as states from './constants/states';
import {GameState,StartMenu,EnemyTestLevel} from './states';

class Game extends Phaser.Game {

	constructor() {
		super(500, 500, Phaser.AUTO, 'content', null);
		this.state.add(states.StartMenu, StartMenu, false);
		this.state.add(states.GameState, GameState, false);
    this.state.add(states.EnemyTestLevel, EnemyTestLevel, false);
		this.state.start(states.EnemyTestLevel);
	}

}

new Game();
