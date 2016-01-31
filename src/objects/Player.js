import PlayerCorpse from './PlayerCorpse';

export default class Player extends Phaser.Sprite {
  constructor(game,x,y){
    super(game,x,y,'dude');
    this.scale = {x: 0.6, y: 0.6};

    this.game = game;
    game.add.existing(this);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.initialPosition = {
      x:x,
      y:y
    }
    this.body.bounce.y = 0.2;
    this.body.collideWorldBounds = true;
    this.body.setSize(42, 50, 5, 16);

    this.animations.add('attack', [17, 18, 19], 10, false);
    this.animations.add('seppucku', [18, 18, 35], 20, false);
    this.animations.add('walk', [10,11,12,13,14,15,16], 10, true);
    this.animations.add('stop', [16], 5, true);
    this.animations.add('jump', [20], 20, true);



    this.cursors = game.input.keyboard.createCursorKeys();
    this.attackButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.seppuckuButton = game.input.keyboard.addKey(Phaser.Keyboard.D);

    // console.log('(Phaser.Keyboard ', Object.keys(Phaser.Keyboard));

    this.direction = 1;
    this.jumpTimer = 0;
    this.corpses = [];
    this.isJumping = false;
    this.animations.play('stop');
  }

  update(){
    const almostGrounded = this.body.onFloor() || 0.2 > Math.abs(this.body.deltaY());
    let canJump = almostGrounded && this.game.time.now > this.jumpTimer

    this.body.velocity.x = 0;
    const cursors = this.cursors;
    const jumpButton = this.jumpButton;

    if(this.animations.currentAnim.name === 'seppucku' && this.animations.currentAnim.isPlaying ) {
      return ;
    }
    if(this.seppuckuButton.isDown && !!!this.justSeppukued ){
      console.log('seppucku!!')
      this.justSeppukued = true;
      let that = this;
      setTimeout(() => {
        that.justSeppukued = false;
      }, 1000);
      this.body.velocity.x = 0
      this.animations.play('seppucku');
      const pos = this.body.position
      this.corpses.push(new PlayerCorpse(this, this.game,pos.x,pos.y-15,'dude'));
      this.x = this.initialPosition.x;
      this.y = this.initialPosition.y;
    }

    if(this.attackButton.isDown){
      this.body.velocity.x = 0
      this.body.velocity.y = 0
      this.animations.play('attack');
    }
    if(this.animations.currentAnim.name === 'attack' && this.animations.currentAnim.isPlaying){
      return;
    }
    if(cursors.left.isDown || cursors.right.isDown) {
      var d = (cursors.right.isDown) ? 1 : -1;
      this.direction = d;
      this.scale.x = d * (Math.abs(this.scale.x));
      this.body.velocity.x = d*150;

      if(!this.isJumping)
        this.animations.play('walk');
    } else {
      if(!this.isJumping){
        this.animations.stop();
        this.animations.play('stop');
      }
    }



    if(canJump)
      this.isJumping = false;
    if (jumpButton.isDown && canJump)
    {
      this.body.velocity.y = -150;
      this.jumpTimer = this.game.time.now + 750;
      this.isJumping = true;
      // this.animations.stop();
      this.animations.play('jump');
      console.log('jump anim')

    }
  }
}
