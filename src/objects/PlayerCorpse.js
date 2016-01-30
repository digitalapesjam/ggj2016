

export default class PlayerCorpse extends Phaser.Sprite {
  constructor(game,x,y,resource){
    super(game,x,y,resource);
    this.game = game;
    game.add.existing(this);
    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.body.bounce.y = 0.2;
    this.body.collideWorldBounds = true;
    this.body.setSize(20, 32, 5, 16);


    this.animations.add('turn', [4], 20, true);
    this.animations.add('attack', [5, 6, 7, 8], 10, false);
    this.animations.add('seppucku', [0], 10, true);
    this.animations.add('right', [5, 6, 7, 8], 10, true);
    this.animations.add('left', [0, 1, 2, 3], 10, true);



    // console.log('(Phaser.Keyboard ', Object.keys(Phaser.Keyboard));

    this.facing = 'left';
    this.jumpTimer = 0;
  }

  update(){
    this.body.velocity.x = 0;
  }
}
