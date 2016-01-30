import PressureDoor from './PressureDoor';

export const GROUND = 'GROUND';
export const JUMP = 'JUMP';
export const HIGH_JUMP = 'HIGH_JUMP';

const types = {
  [GROUND]: {
    label: GROUND,
    path: 'assets/sprites/ground.png',
    len: 20,
  },
  [JUMP]: {
    label: JUMP,
    path: 'assets/sprites/high_terrain.png',
    len: 20,
  },
  [HIGH_JUMP]: {
    label: HIGH_JUMP,
    path: 'assets/sprites/higher_terrain.png',
    len: 20,
  },
}

export function preload(state) {
    Object.keys(types).forEach(k => {
      const label = types[k].label;
      const path = types[k].path;
      state.load.image(label, path);
    })
}

export class Level {
  constructor(name, game, terrainConf, sensorDoorPositions, collisions, heroSprite) {
    console.log('making level', {name, terrainConf, sensorDoorPositions});
    this.name = name;
    this.terrainConf = terrainConf;
    this.sensorDoorPositions = sensorDoorPositions;
    this.collisions = collisions;
    this.heroSprite = heroSprite;
    this.game = game;
  }

  create() {
    const game = this.game;
    console.log('creating level', this.name);
    this.terrainConf.forEach(block => {
      console.log('making sprite for', block.type.label);
      const sprite = game.add.sprite(block.x, block.y, block.type.label);
      game.physics.arcade.enable(sprite);
      sprite.body.allowGravity = false;
      sprite.body.immovable = true;
      sprite.anchor.y = 1;
    });
    const sensorDisablers = [];
    const collisions = this.collisions;
    const hero = this.heroSprite;
    this.sensorDoorPositions.forEach(pos => {
      sensorDisablers.push(PressureDoor(game, collisions, hero, pos.sensor, pos.door));
    });
    this.sensorDisablers = sensorDisablers;
  }

  update() {}

  onHeroSuicide() {
    // if any sensor is in opened state and is active, stuck the door to open
    this.sensorDisablers.forEach(fn => fn());
  }
}

export class Config {
  constructor(worldHeight) {
    this.x = 0;
    this.y = worldHeight;
    this.blocks = [];
  }

  add(type) {
    const v = {
      type: types[type],
      x: this.x,
      y: this.y,
    };
    this.blocks.push(v);
    this.x += v.type.len;
    return this;
  }

  terrain() {return this.blocks;}
}
