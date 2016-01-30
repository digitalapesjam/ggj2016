import PlayerCorpse from './PlayerCorpse';

export default class Player extends Phaser.Sprite {
  constructor(game,x,y){
    super(game,x,y,'dude');

    this.game = game;
    game.add.existing(this);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.initialPosition = {
      x:x,
      y:y
    }
    this.body.bounce.y = 0.2;
    this.body.collideWorldBounds = true;
    this.body.setSize(20, 32, 5, 16);


    this.animations.add('turn', [4], 20, true);
    this.animations.add('attack_left', [2,1,0], 10, false);
    this.animations.add('attack_right', [17,18,19], 10, false);
    this.animations.add('seppucku', [18, 18, 35], 20, false);
    this.animations.add('right', [10, 11,12,13,14,15,16], 10, true);
    this.animations.add('left', [3,4,5,6,7,8,9], 10, true);
    this.animations.add('stop_left', [3], 5, true);
    this.animations.add('stop_right', [16], 5, true);



    this.cursors = game.input.keyboard.createCursorKeys();
    this.attackButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.seppuckuButton = game.input.keyboard.addKey(Phaser.Keyboard.D);

    // console.log('(Phaser.Keyboard ', Object.keys(Phaser.Keyboard));

    this.facing = 'left';
    this.direction = 'left';
    this.jumpTimer = 0;
    this.corpses = [];
  }

  update(){
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
      console.log('this.body ',this.body);
      this.animations.play('seppucku');

      const pos = this.body.position
      this.corpses.push(new PlayerCorpse(this.game,pos.x,pos.y-15,'dude'));

      this.x = this.initialPosition.x;
      this.y = this.initialPosition.y;


    }


    if(this.attackButton.isDown){
      this.body.velocity.x = 0
      this.body.velocity.y = 0

      let attack_anim = 'attack_'+this.direction;
      this.animations.play(attack_anim);
    }
    if(this.animations.currentAnim.name === 'attack' && this.animations.currentAnim.isPlaying){
      return;
    }


    if (cursors.left.isDown){
      this.body.velocity.x = -150;
      this.direction = 'left';

      if (this.facing != 'left')
      {
        this.animations.play('left');
        this.facing = 'left';
      }
    }else if (cursors.right.isDown){
      this.direction = 'right';
      this.body.velocity.x = 150;

      if (this.facing != 'right')
      {
        this.animations.play('right');
        this.facing = 'right';
      }
    }
    else
    {
      if (this.facing != 'idle')
      {
        // this.animations.stop();

        if (this.facing == 'left')
        {
          this.animations.play('stop_left');
          // this.frame = 0;
        }
        else
        {
          this.animations.play('stop_right');
          // this.frame = 5;
        }

        this.facing = 'idle';
      }
    }

    const almostGrounded = this.body.onFloor() || 0.2 > Math.abs(this.body.deltaY());
    if (jumpButton.isDown && almostGrounded && this.game.time.now > this.jumpTimer)
    {
      this.body.velocity.y = -150;
      this.jumpTimer = this.game.time.now + 750;
    }
  }
}
