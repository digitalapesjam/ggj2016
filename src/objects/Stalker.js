export default class Stalker extends Phaser.Sprite {
  constructor(game,x,y){
    super(game,x,y,'monster');
    this.game = game;
    game.add.existing(this);
    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.body.bounce.y = 0.0;
    this.body.collideWorldBounds = true;
    this.direction = 1;
    this.startingPosition = x;
    this.range = 200;
    this.justTurned = false;
    this.anchor.setTo(.5, 0);
    this.agility = 5;
    this.state = 'idle';

    this.animations.add('attack', [3,4],this.agility,true);
    this.animations.add('idle', [4],this.agility,true);
    this.animations.add('walk', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],this.agility*10,true);
  }


  update(state){
    if (state){
        if (Math.abs(state.gameObjects.player.x - this.x) < this.range &&  Math.abs(state.gameObjects.player.y - this.y) < 20){ //in range and same vertical position
          this.direction = (state.gameObjects.player.x - this.x)/
                          Math.abs(state.gameObjects.player.x - this.x);
          this.state = 'following';
        } else {
          this.state = 'idle';
        }

        this.game.physics.arcade.collide(this,state.gameObjects.player,(spriteA,spriteB)=>{
          if (Math.abs(state.gameObjects.player.y - this.y) < 20)//same vertical position
            this.state = 'attacking';
        },null,this);
    }

    switch (this.state) {
        case 'idle':
          this.body.velocity.x = 0;
          this.animations.play('idle');
          break;
        case 'following':
          this.scale.x = this.direction;
          this.body.velocity.x = this.direction*10*this.agility;
          this.animations.play('walk');
          break;
        case 'attacking':
          this.animations.play('attack');
          break;
    }
  }
}
