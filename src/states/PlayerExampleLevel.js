import Player from 'objects/Player';
import Walker from 'objects/behaviours/Walker';
import PlayerAnimation from 'objects/animations/PlayerAnimation';
import System from '../util/System';

class TestLevel extends Phaser.State {

  preload(){
    this.load.spritesheet(PlayerAnimation.label, PlayerAnimation.path, 37, 45, 18);
  }

	create() {
    this.ecsystem = new System(this.game);
		let center = { x: this.game.world.centerX, y: this.game.world.centerY }
		let player = new Player(this.game, center.x, center.y);
    this.ecsystem.register('player1',player);
	}


  update() {
		this.ecsystem.update(this.game);
	}
}

export default TestLevel;
