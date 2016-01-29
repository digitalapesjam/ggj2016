import RainbowText from 'objects/RainbowText';
import {System, CollisionChecker} from '../util';

class GameState extends Phaser.State {

	create() {
		let center = { x: this.game.world.centerX, y: this.game.world.centerY }
		let text = new RainbowText(this.game, center.x, center.y, "- phaser -\nwith a sprinkle of\nES6 dust");
		text.anchor.set(0.5);
		this.ecsystem = new System(this.game);
		this.ecsystem.register(0, 'rainbow', {
			update: () => {
				//console.log('updated!');
			}
		});
		this.collisions = new CollisionChecker(this.game);
	}

	update() {
		this.ecsystem.update();
		this.collisions.checkCollisions();
	}

}

export default GameState;
