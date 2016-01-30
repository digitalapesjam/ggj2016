export default class Zombie extends Phaser.Sprite {
  constructor(game,x,y){
    super(game,x,y,'mummy');
    this.game = game;
    game.add.existing(this);
    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.body.bounce.y = 0.0;
    this.body.collideWorldBounds = true;
    this.direction = 1;
    this.startingPosition = x;
    this.range = 80;
    this.justTurned = false;
    this.anchor.setTo(.5, 0);
    this.agility = 1;
    this.state = 'roaming';


    this.animations.add('attack',  [4, 5, 6 ,7, 6, 5],10,false);
    this.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],this.agility*10,true);
  }


  update(state){
    if (state)
      this.game.physics.arcade.collide(this,state.gameObjects['player'],(spriteA,spriteB)=>{
        this.state = 'attacking';
      },null,this);

    if (!this.animations.currentAnim.isPlaying && this.animations.currentAnim.name === 'attack')
      this.state = 'roaming';

    switch (this.state) {
        case 'attacking':
          this.body.velocity.x = 0;
          this.animations.play('attack');
          break;
        case 'roaming':
          if (Math.abs(this.x - this.startingPosition) > this.range/2 && //out of the range
            this.direction * (this.x - this.startingPosition) > 0 ) //going in the wrong direction
                this.direction *= -1; //turn

          this.scale.x = this.direction;
          this.body.velocity.x = this.direction*10*this.agility;
          this.animations.play('walk');
          break;
    }
  }
}
