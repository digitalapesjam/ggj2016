import Mummy from 'objects/Mummy';
import Walker from 'objects/behaviours/Walker';
import MummyAnimation from 'objects/animations/MummyAnimation';
import System from '../util/System';

class TestLevel extends Phaser.State {

  preload(){
    this.load.spritesheet(MummyAnimation.label, MummyAnimation.path, 37, 45, 18);
  }

	create() {
    this.ecsystem = new System(this.game);
		let center = { x: this.game.world.centerX, y: this.game.world.centerY }
    let zombie = new Mummy(this.game, center.x+100, center.y);
    zombie.behaviour = null;
    let player = new Mummy(this.game, center.x, center.y);
    this.ecsystem.register('mrZombie',zombie);
    this.ecsystem.register('mrPlayer',player);
	}


  update() {
		this.ecsystem.update(this.game);
	}
}

export default TestLevel;
