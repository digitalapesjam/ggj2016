class MummyAnimation {

    constructor(game,x,y){
      this.sprite = game.add.sprite(x, y, MummyAnimation.label);
      this.sprite.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
      this.sprite.animations.play('walk', 20, true);
      this.sprite.scale.set(4);
      this.sprite.smoothed = false;
    }

    stop(){

    }

    walk(speed){

    }

    attack(){

    }
}

MummyAnimation.path = 'assets/sprites/mummy37x45.png';
MummyAnimation.label = 'mummy';

export default MummyAnimation
