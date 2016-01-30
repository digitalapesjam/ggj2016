import Character from 'objects/Character';
import MummyAnimation from 'objects/animations/MummyAnimation';
import Interactive from 'objects/behaviours/Interactive';

class Player extends Character {

    constructor(game,x,y){
      super(game,x,y);
      this.animation = new MummyAnimation(game,x,y,4);
      this.behaviour = new Interactive(game, x,100);
      this.agility = .5;
    }

}

export default Player;
