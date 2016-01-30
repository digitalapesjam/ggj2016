import {System, CollisionChecker} from '../util';
import DoorAnimation from 'objects/animations/DoorAnimation';
import PressureDoor from 'objects/PressureDoor';
import {preload as levelBlockPreload, Level, Config, GROUND, JUMP, HIGH_JUMP} from 'objects/Level';

class GameState extends Phaser.State {

  preload() {
    this.load.spritesheet(DoorAnimation.label, DoorAnimation.path, 70, 70);
    this.load.image('sensor', 'assets/sprites/sensor.png');
    levelBlockPreload(this);
  }

  createLevel(hero) {
    const wHgt = this.game.world.height;
    const c = new Config(wHgt);
    c
    .add(GROUND)
    .add(GROUND)
    .add(JUMP)
    .add(GROUND).add(GROUND).add(GROUND).add(GROUND).add(GROUND).add(GROUND).add(GROUND).add(GROUND)
    .add(HIGH_JUMP).add(GROUND).add(GROUND).add(GROUND).add(GROUND).add(GROUND)
    .add(GROUND).add(GROUND).add(GROUND).add(GROUND).add(GROUND).add(GROUND).add(GROUND)
    .add(GROUND).add(GROUND).add(GROUND).add(GROUND).add(GROUND).add(GROUND).add(GROUND)
    .add(GROUND).add(GROUND).add(GROUND).add(GROUND).add(GROUND).add(GROUND).add(GROUND);

    const doors = [
      {
        sensor: {x: 100, y: wHgt},
        door: {x: 400, y: wHgt},
      },
    ];

    console.log('making level');
    const level = new Level('lvl1', this.game, c.terrain(), doors, this.collisions, hero);
    this.ecsystem.register('level', level);
  }

	create() {
    const game = this.game;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
		let center = { x: this.game.world.centerX, y: this.game.world.centerY }
		this.ecsystem = new System(this.game);
		this.collisions = new CollisionChecker(this.game);

    // const sensorSpr = this.game.add.sprite(center.x - 50, center.y, 'sensor');
    // // add targe sprite
    const someSpr = this.game.add.sprite(0, 0, DoorAnimation.label);
    game.physics.enable(someSpr);
    someSpr.allowGravity = false;
    someSpr.anchor.x = someSpr.anchor.y = 0.5;
    this.createLevel(someSpr);
    // let deleteDoor = null;
    this.ecsystem.register('hero', {
      update: () => {
        // game.physics.arcade.moveToPointer(someSpr, 150);
        someSpr.x = game.input.activePointer.x;
        someSpr.y = game.input.activePointer.y;
        // if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        //
        // }
      }
    });
    // // const doorAnim = new DoorAnimation(this.game, center.x + 50, center.y);
    // deleteDoor = PressureDoor(
    //   game,
    //   this.collisions,
    //   someSpr,
    //   {x: center.x - 50, y: center.y},
    //   {x: center.x + 50, y: center.y}
    // );
	}

	update() {
		this.ecsystem.update(this.game);
		this.collisions.checkCollisions(this.ecsystem);
	}

}

export default GameState;
