class MummyAnimation {

    constructor(game,x,y,scale){
      this.scale = scale;
      this.sprite = game.add.sprite(x, y, MummyAnimation.label);
      this.sprite.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
      this.sprite.scale.set(scale);
      this.sprite.smoothed = false;
      this.sprite.anchor.setTo(.5, 1);
      this.currentspeed = 0;
    }

    stop(){
      this.sprite.animations.stop();
    }

    walk(speed){
      if (speed > 0) //going right
        this.sprite.scale.x = this.scale;
      if (speed < 0) //going left
        this.sprite.scale.x = -this.scale;

      if (speed != this.currentspeed)
        this.sprite.animations.play('walk', Math.abs(speed)*20, true);

      this.currentspeed = speed;
    }

    attack(){

    }
}

MummyAnimation.path = 'assets/sprites/mummy37x45.png';
MummyAnimation.label = 'mummy';

export default MummyAnimation
