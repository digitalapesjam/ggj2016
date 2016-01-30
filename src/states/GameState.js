import Player from 'objects/Player';
import Zombie from 'objects/Zombie';

class GameState extends Phaser.State {

  preload(){
    this.game.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('tiles-1', 'assets/tiles-1.png');
    this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    this.game.load.spritesheet('droid', 'assets/droid.png', 32, 32);
    this.game.load.image('starSmall', 'assets/star.png');
    this.game.load.image('starBig', 'assets/star2.png');
    this.game.load.image('background', 'assets/background2.png');
    this.game.load.spritesheet('mummy', 'assets/mummy37x45.png', 37, 45, 18);
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

    //Un-comment this on to see the collision tiles
    //this.layer.debug = true;

    this.layer.resizeWorld();

    this.game.physics.arcade.gravity.y = 250;

    this.gameObjects = [];
    this.gameObjects['player'] = new Player(this.game,32,32);
    this.gameObjects['zombie'] = new Zombie(this.game,100,40);
    this.game.camera.follow(this.gameObjects['player']);
	}

  update(){
    Object.keys(this.gameObjects).forEach((key)=>{
      this.game.physics.arcade.collide(this.gameObjects[key], this.layer);
      this.gameObjects[key].update(this);
    });
  }

}

export default GameState;
