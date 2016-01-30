import Mummy from 'objects/Mummy';
import Player from 'objects/Player';
import System from '../util/System';
import MummyAnimation from 'objects/animations/MummyAnimation';
import PlayerAnimation from 'objects/animations/PlayerAnimation';


class TestLevel extends Phaser.State {

  preload(){
    this.load.spritesheet(MummyAnimation.label, MummyAnimation.path, 37, 45, 18);
    this.load.spritesheet(PlayerAnimation.label, PlayerAnimation.path, 175.83, 174.33, 36);
  }

	create() {
    this.ecsystem = new System(this.game);
		let center = { x: this.game.world.centerX, y: this.game.world.centerY }
    let zombie = new Mummy(this.game, center.x-150, center.y);
    let player = new Player(this.game, center.x, center.y);
    this.ecsystem.register('mrZombie',zombie);
    this.ecsystem.register('mrPlayer',player);
	}

  update() {
		this.ecsystem.update(this.game);
	}
}

export default TestLevel;
