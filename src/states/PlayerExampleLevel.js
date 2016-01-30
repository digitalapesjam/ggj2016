import Player from 'objects/Player';
import Walker from 'objects/behaviours/Walker';
import PlayerAnimation from 'objects/animations/PlayerAnimation';
import System from '../util/System';
import DoorAnimation from 'objects/animations/DoorAnimation';
import PressureDoor from 'objects/PressureDoor';
import {preload as levelBlockPreload, Level, Config, GROUND, JUMP, HIGH_JUMP} from 'objects/Level';

class TestLevel extends Phaser.State {

  preload(){
    this.load.spritesheet(PlayerAnimation.label, PlayerAnimation.path, 175.83, 174.33, 36);
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
    .add(GROUND).add(GROUND).add(GROUND).add(GROUND).add(GROUND).add(GROUND).add(GROUND)
    .add(GROUND).add(GROUND).add(GROUND).add(GROUND).add(GROUND).add(GROUND).add(GROUND).add(GROUND)
    .add(HIGH_JUMP).add(GROUND).add(GROUND).add(GROUND).add(GROUND).add(GROUND);

    const doors = [
      {
        sensor: {x: 100, y: wHgt},
        door: {x: 400, y: wHgt},
      },
    ];

    console.log('making level');
    const level = new Level('lvl1', this.game, c.terrain(), doors, this.ecsystem, hero);
    this.ecsystem.register('level', level);
  }

	create() {
    this.game.physics.arcade.gravity.y = -1;
    this.ecsystem = new System(this.game);
		let center = { x: this.game.world.centerX, y: this.game.world.centerY }
		let player = new Player(this.game, center.x, center.y);
    this.ecsystem.register('player1',player);
    this.createLevel(player.animation.sprite);
	}


  update() {
		this.ecsystem.update(this.game);
	}
}

export default TestLevel;
