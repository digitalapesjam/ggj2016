

export default class PlayerCorpse extends Phaser.Sprite {
  constructor(player, game,x,y,resource){
    super(game,x,y,resource);
    this.scale = player.scale;
    this.game = game;
    game.add.existing(this);
    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.body.bounce.y = 0.2;
    this.body.collideWorldBounds = true;
    this.body.setSize(42, 50, 5, 16);



    // console.log('(Phaser.Keyboard ', Object.keys(Phaser.Keyboard));

    this.facing = 'left';
    this.jumpTimer = 0;
    this.frame = 23;
    this.lifespan = 10000;
  }

  fade() {
    const n = this.lifespan / 10000;
    this.alpha = n;
  }

  update(){
    if (this.lifespan > 0) {
      this.fade();
    }
    this.body.velocity.x = 0;
  }
}
