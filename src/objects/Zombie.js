export default class Zombie extends Phaser.Sprite {
  constructor(gamestate, game,x,y){
    super(game,x,y,'monster');
    this.scale = {x: 2, y: 2};
    this.gameState = gamestate;
    this.game = game;
    game.add.existing(this);
    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.body.immovable = true;
    this.body.bounce.y = 0.0;
    this.body.collideWorldBounds = true;
    this.direction = 1;
    this.startingPosition = x;
    this.range = 80;
    this.justTurned = false;
    this.anchor.setTo(.5, 0);
    this.agility = 1;
    this.state = 'roaming';

    this.scale.y = 0.35;
    this.scale.x = 0.35;

    this.animations.add('die', [114,115,116,117,118,119,120,121],10,false);
    this.animations.add('attack', [44,45,46,47,48,46,45],this.agility*10,false);
    this.animations.add('walk', [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],this.agility*10,true);

    this.health = 100;

    this.damageSound = this.game.add.audio('damage_zombie');
    this.deathSound = this.game.add.audio('death_zombie');
    this.attackSound = this.game.add.audio('punch');
  }

  damage(dam){
    if (this.state !== 'dead' && this.health - dam <= 0){
      this.body.velocity.x = 0;
      this.animations.play('die');
      this.state = 'dead';
      let that = this;
      this.deathSound.play();
      setTimeout(function () {
        that.kill();
      }, 300);
    } else {
      super.damage(dam);
      this.damageSound.play();
      //const that = this;
      //this.punchSound.onDecoded.add(function() {that.punchSound.play();});
    }

  }

  update(){
    if (this.state != 'dead'){
      this.game.physics.arcade.collide(this,this.gameState.gameObjects.player,(spriteA,player)=>{
        this.state = 'attacking';
        player.setCurrentEnemy(this);
      },null,this);

      if (!this.animations.currentAnim.isPlaying && this.animations.currentAnim.name === 'attack'){
        this.state = 'roaming';
      }

      switch (this.state) {
          case 'attacking':
            if (!this.justAttacked) {
              this.direction = (this.gameState.gameObjects.player.x - this.x)/
                              Math.abs(this.gameState.gameObjects.player.x - this.x)
              this.scale.x = this.direction*Math.abs(this.scale.x);
              this.justAttacked = true;
              this.body.velocity.x = 0;
              const that = this;
              setTimeout(function () {
                that.animations.play('attack');
                setTimeout(function () {
                  that.attackSound.play();
                }, 200);
                setTimeout(function () {
                  that.gameState.gameObjects.player.damage(10);
                  that.justAttacked = false;
                }, 1000); //cooldown
              }, 100); //reaction time
            }
            break;
          case 'roaming':
            if (Math.abs(this.x - this.startingPosition) > this.range/2 && //out of the range
              this.direction * (this.x - this.startingPosition) > 0 ) //going in the wrong direction
                  this.direction *= -1; //turn

            this.scale.x = this.direction*Math.abs(this.scale.x);
            this.body.velocity.x = this.direction*10*this.agility;
            this.animations.play('walk');
            break;
      }

    }
  }
}
