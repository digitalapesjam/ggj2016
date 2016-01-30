
let _animWalkId = 'player_walk';
let _animJumpId = 'player_jump';
let _animAttackId = 'player_attack';
let _animStopId = 'player_stop';


class PlayerAnimation {

    constructor(game,x,y,scale){
      this.scale = scale;
      this.sprite = game.add.sprite(x, y, PlayerAnimation.label,1);
      this.sprite.animations.add(_animWalkId, [7,8,9,10,11]);
      this.sprite.animations.add(_animJumpId, [18,19]);
      this.sprite.animations.add(_animAttackId, [25,26,27,28, 32,33,34,1]);
      this.sprite.animations.add(_animStopId, [1]);

      this.sprite.scale.set(scale);
      this.sprite.smoothed = false;
      this.sprite.anchor.setTo(.5, 1);
      this.currentspeed = 0;
      this.isAttacking = false;

    }

    stop(){
      // console.log('this.sprite.animations ', );
      if (this.sprite.animations.currentAnim.name !== _animAttackId) {
        this.sprite.animations.stop();
        this.sprite.animations.play(_animStopId, 20, false);
      }

    }

    walk(speed){
      if (speed > 0) //going right
        this.sprite.scale.x = this.scale;
      if (speed < 0) //going left
        this.sprite.scale.x = -this.scale;


      this.sprite.animations.play(_animWalkId, Math.abs(speed)*20, true);
      // if (speed != this.currentspeed || this.sprite.animations.currentAnim.name != _animWalkId){
      //
      // }

      this.currentspeed = speed;
    }

    attack(){
      var attackTime = 20;
      this.currentspeed = 0;
      this.stop()
      this.sprite.animations.play(_animAttackId, 20, false  );
      // this.isAttacking = true;

    }

    die() {

    }

    jump(){

    }
}

PlayerAnimation.path = 'assets/sprites/samurai.png';
PlayerAnimation.label = 'player_animation';

export default PlayerAnimation
