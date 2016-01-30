import {System, CollisionChecker} from '../util';
import DoorAnimation from 'objects/animations/DoorAnimation';
import PressureDoor from 'objects/PressureDoor';

class GameState extends Phaser.State {

  preload() {
    this.load.spritesheet(DoorAnimation.label, DoorAnimation.path, 70, 70);
    this.load.image('sensor', 'assets/sprites/sensor.png');
  }

	create() {
    const game = this.game;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
		let center = { x: this.game.world.centerX, y: this.game.world.centerY }
		this.ecsystem = new System(this.game);
		this.collisions = new CollisionChecker(this.game);

    const sensorSpr = this.game.add.sprite(center.x - 50, center.y, 'sensor');
    // add targe sprite
    const someSpr = this.game.add.sprite(0, 0, DoorAnimation.label);
    this.ecsystem.register('hero', {
      update: () => {
        someSpr.x = game.input.activePointer.x;
        someSpr.y = game.input.activePointer.y;
      }
    });
    const doorAnim = new DoorAnimation(this.game, center.x + 50, center.y);
    PressureDoor(
      this.game,
      this.collisions,
      sensorSpr,
      someSpr,
      doorAnim,
      doorAnim.open.bind(doorAnim),
      doorAnim.close.bind(doorAnim)
    );
	}

	update() {
		this.ecsystem.update(this.game);
		this.collisions.checkCollisions(this.ecsystem);
	}

}

export default GameState;
