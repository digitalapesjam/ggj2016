export default class Stalker extends Phaser.Sprite {
  constructor(stage, game,x,y){
    super(game,x,y,'monster');
    this.gameState = stage;
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

    this.animations.add('die', [16,17,18,19],10,false);
    this.animations.add('attack', [3,4],this.agility,true);
    this.animations.add('idle', [4],this.agility,true);
    this.animations.add('walk', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],this.agility*10,true);

    this.health = 50;
  }

  damage(dam){

    if (this.health - dam <= 0){
      this.body.velocity.x = 0;
      this.animations.play('die');
      this.state = 'dead';
      let that = this;
      setTimeout(function () {
        that.kill();
      }, 300);
    } else
      super.damage(dam);
  }

  update(){
    if (this.alive){
        if (Math.abs(this.gameState.gameObjects.player.x - this.x) < this.range &&  Math.abs(this.gameState.gameObjects.player.y - this.y) < 20){ //in range and same vertical position
          this.direction = (this.gameState.gameObjects.player.x - this.x)/
                          Math.abs(this.gameState.gameObjects.player.x - this.x);
          this.state = 'following';
        } else {
          this.state = 'idle';
        }

        this.game.physics.arcade.collide(this,this.gameState.gameObjects.player,(spriteA,player)=>{
          player.setCurrentEnemy(this);
          if (Math.abs(this.gameState.gameObjects.player.y - this.y) < 20)//same vertical position
            this.state = 'attacking';
        },null,this);

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
              if (!this.justAttacked) {
                this.justAttacked = true;
                this.animations.play('attack');
                this.gameState.gameObjects.player.damage(20);
                const that = this;
                setTimeout(function () {
                  that.justAttacked = false;
                }, 500);
              }
              break;
        }
      }
  }
}
