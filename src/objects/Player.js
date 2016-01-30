export default class Player extends Phaser.Sprite {
  constructor(game,x,y,resource){
    super(game,x,y,resource);

    this.game = game;
    game.add.existing(this);
    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.body.bounce.y = 0.2;
    this.body.collideWorldBounds = true;
    this.body.setSize(20, 32, 5, 16);

    this.animations.add('left', [0, 1, 2, 3], 10, true);
    this.animations.add('turn', [4], 20, true);
    this.animations.add('right', [5, 6, 7, 8], 10, true);

    this.cursors = game.input.keyboard.createCursorKeys();
    this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.facing = 'left';
    this.jumpTimer = 0;
  }

  update(){
    this.body.velocity.x = 0;
    const cursors = this.cursors;
    const jumpButton = this.jumpButton;

    if (cursors.left.isDown)
        {
            this.body.velocity.x = -150;

            if (this.facing != 'left')
            {
                this.animations.play('left');
                this.facing = 'left';
            }
        }
        else if (cursors.right.isDown)
        {
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
                this.animations.stop();

                if (this.facing == 'left')
                {
                    this.frame = 0;
                }
                else
                {
                    this.frame = 5;
                }

                this.facing = 'idle';
            }
        }

        if (jumpButton.isDown && this.body.onFloor() && this.game.time.now > this.jumpTimer)
        {
            this.body.velocity.y = -250;
            this.jumpTimer = this.game.time.now + 750;
        }


  }
}
