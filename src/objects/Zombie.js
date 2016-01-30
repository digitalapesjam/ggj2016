export default class Zombie extends Phaser.Sprite {
  constructor(game,x,y){
    super(game,x,y,'mummy');
    this.game = game;
    game.add.existing(this);
    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);

    this.body.bounce.y = 0.0;
    this.body.collideWorldBounds = true;
    this.direction = 1;
    this.startingPosition = x;
    this.range = 60;
  }

  update(){
    if (Math.abs(this.x - this.startingPosition) > this.range/2){
        //console.log(this.x - this.startingPosition)
          this.body.velocity.x = 0;
          this.direction *= -1;
          this.animations.stop();
    }
    console.log(this.direction);
    this.scale.x = this.direction;
    this.animations.play('walk', 10*this.direction, true);
    this.body.velocity.x = this.direction*10;
  }
}
