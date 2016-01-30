class MummyAnimation {

    constructor(game,x,y,scale){
      this.scale = scale;
      this.sprite = game.add.sprite(x, y, MummyAnimation.label);
      this.sprite.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
      this.sprite.animations.add('die', [10, 11, 12, 13, 14, 15]);
      this.sprite.animations.add('attack', [0, 1, 2, 3, 13, 14, 15]);
      this.sprite.scale.set(scale);
      this.sprite.smoothed = false;
      this.sprite.anchor.setTo(.5, 1);
      this.currentspeed = 0;
      game.physics.arcade.enable(this.sprite);
    }

    stop(){
      this.sprite.animations.stop();
    }

    walk(speed){
        if (speed > 0) //going right
          this.sprite.scale.x = this.scale;
        if (speed < 0) //going left
          this.sprite.scale.x = -this.scale;

        if (speed != this.currentspeed || this.sprite.animations.currentAnim.name != 'walk'){
          this.sprite.animations.play('walk', Math.abs(speed), true);
        }

        this.currentspeed = speed;
    }

    attack(){
      if (this.sprite.animations.currentAnim.name != 'attack' || !this.sprite.animations.isPlaying)
        this.sprite.animations.play('attack', 10, false);
    }

    die() {
      if (this.sprite.animations.currentAnim.name != 'die')
        this.sprite.animations.play('die', 10, false);
    }
}

MummyAnimation.path = 'assets/sprites/mummy37x45.png';
MummyAnimation.label = 'mummy';

export default MummyAnimation
