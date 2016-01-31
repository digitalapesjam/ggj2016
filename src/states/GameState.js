import Player from 'objects/Player';
import Zombie from 'objects/Zombie';
import Stalker from 'objects/Stalker';

class GameState extends Phaser.State {

  preload(){
    this.game.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('tiles-1', 'assets/tiles-1.png');

    this.game.load.image('min', 'assets/min.png');
    this.game.load.image('sensor', 'assets/sensor.png');
    this.game.load.spritesheet('door', 'assets/door.png', 16, 64);
    this.game.load.spritesheet('dude', 'assets/samurai.png', 42, 70);
    this.game.load.spritesheet('droid', 'assets/droid.png', 32, 32);
    this.game.load.image('starSmall', 'assets/star.png');
    this.game.load.image('starBig', 'assets/star2.png');
    this.game.load.image('background', 'assets/background2.png');
    this.game.load.spritesheet('mummy', 'assets/mummy37x45.png', 37, 45, 18);
    this.game.load.spritesheet('monster', 'assets/monster39x40.png', 39, 40, 16);
  }

	create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = '#000000';
    this.background = this.game.add.tileSprite(0, 0, 800, 600, 'background');
    this.background.fixedToCamera = true;

    this.map = this.game.add.tilemap('level1');
    this.map.addTilesetImage('tiles-1');
    this.map.setCollisionByExclusion([ 13, 14, 15, 16, 46, 47, 48, 49, 50, 51 ]);

    this.layer = this.map.createLayer('Tile Layer 1');
    // this.layer2 = this.map.createLayer('Tile Layer 2');

    // this.map.setTileIndexCallback([90], (sprite, tile) => {
    //   console.log('hit', {sprite, tile});
    // }, null, this.layer2);
    //
    //Un-comment this on to see the collision tiles
    //this.layer.debug = true;

    this.layer.resizeWorld();

    this.game.physics.arcade.gravity.y = 250;

    this.gameObjects = [];
    this.gameObjects['player'] = new Player(this.game,32,32);
    // this.gameObjects['stalker'] = new Stalker(this.game,300,40);
    // this.gameObjects['mummy'] = new Zombie(this.game,100,40);
    this.game.camera.follow(this.gameObjects['player']);

    const sensorsSpec = JSON.parse(`[${this.map.properties.sensors}]`);
    const game = this.game;

    this.sensors = [];
    const sensors = this.sensors;
    const g = this.game;
    const tileW = this.map.tileWidth;
    const tileH = this.map.tileHeight;
    sensorsSpec.forEach(([[stx, sty], [dtx, dty]]) => {

      const sensorSprite = game.add.sprite(stx * tileW, sty * tileH, 'sensor');
      sensorSprite.anchor.y = 1;

      const doorSprite = game.add.sprite(dtx * tileW, dty * tileH, 'door');
      doorSprite.anchor.y = 1;
      doorSprite.animations.add('open', [1]);
      doorSprite.animations.add('close', [0]);
      g.physics.arcade.enable(doorSprite);
      doorSprite.body.allowGravity = false;
      doorSprite.body.immovable = true;

      doorSprite.play('close');
      sensors.push({sensorSprite, doorSprite, hit: false});
    });

    this.loadEnemies(game, this.map);
	}

  loadEnemies(game, map) {
    const tileW = this.map.tileWidth;
    const tileH = this.map.tileHeight;
    const {tileproperties} = this.map.addTilesetImage('min');
    const layer = map.createLayer('Enemy');
    layer.renderable = false;

    const go = this.gameObjects;
    layer.layer.data.forEach((row, rowIdx) => {
      row.forEach((tile, colIdx) => {
        if (tile.index > -1) {
          if (tile.properties.type) {
            const key = `${tile.properties.type}_${rowIdx}:${colIdx}`;
            console.log('creating', key);
            switch (tile.properties.type) {
              case 'mummy':
                go[key] = new Zombie(game, colIdx * tileW, (rowIdx - 1) * tileH);
                break;
              case 'stalker':
                go[key] = new Stalker(game, colIdx * tileW, (rowIdx - 1) * tileH);
                break;
              default:
                break;
            }
          }
        }
      });
    });
  }

  update(){
    const game = this.game;
    const that = this;

    this.sensors.forEach(s => {
      const hit = that.gameObjects.player.overlap(s.sensorSprite);
      if (hit !== s.hit) {
        console.log('hit it: ' + hit);
        s.hit = hit;
        if (hit) {
          s.doorSprite.play('open');
        }
        else {
          s.doorSprite.play('close');
        }
      }
    });

    const sensors = this.sensors;
    const deleteSensors = [];
    this.gameObjects.player.corpses.forEach((corpse) =>{ //corpses collisions
      game.physics.arcade.collide(corpse, that.layer);
      Object.keys(that.gameObjects).forEach((key) => {
          game.physics.arcade.collide(corpse, that.gameObjects[key]);
      });
      that.gameObjects.player.corpses.forEach(otherCorpse => {
        if (corpse !== otherCorpse) {
          game.physics.arcade.collide(corpse, otherCorpse);
        }
      })
      sensors.forEach(sensor => {
        if (!sensor.hit) {
          const hit = corpse.overlap(sensor.sensorSprite);
          if (hit) {
            sensor.doorSprite.play('open');
            sensor.hit = true;
            deleteSensors.push(sensor);
          }
        }
      });
    });
    deleteSensors.forEach(s => {
      const idx = sensors.indexOf(s);
      sensors.splice(idx, 1);
    })

    Object.keys(this.gameObjects).forEach((key)=>{
      game.physics.arcade.collide(that.gameObjects[key], that.layer);
      sensors.forEach(({doorSprite, hit}) => {
        if (!hit) {
          game.physics.arcade.collide(that.gameObjects[key], doorSprite);
        }
      });
      that.gameObjects[key].update(that);
    });
  }

}

export default GameState;
