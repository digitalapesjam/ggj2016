
let _animWalkId = 'player_walk';
let _animJumpId = 'player_jump';
let _animAttackId = 'player_attack';


class PlayerAnimation {

    constructor(game,x,y,scale){
      this.scale = scale;
      this.sprite = game.add.sprite(x, y, PlayerAnimation.label,1);
      this.sprite.animations.add(_animWalkId, [7,8,9,10,11]);
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
      console.log('walk PlayerAnimation!! ', this.sprite.animations.currentAnim.name);
      console.log('walk PlayerAnimatio: ', this.currentspeed);

      if (speed > 0) //going right
        this.sprite.scale.x = this.scale;
      if (speed < 0) //going left
        this.sprite.scale.x = -this.scale;

      if (speed != this.currentspeed || this.sprite.animations.currentAnim.name != _animWalkId){
        this.sprite.animations.play(_animWalkId, Math.abs(speed)*20, true);
      }

      this.currentspeed = speed;
    }

    attack(){

    }

    die() {

    }

    jump(){

    }
}

PlayerAnimation.path = 'assets/sprites/samurai.png';
PlayerAnimation.label = 'player_animation';

export default PlayerAnimation
