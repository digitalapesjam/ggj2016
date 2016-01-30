import Character from 'objects/Character';
import MummyAnimation from 'objects/animations/MummyAnimation';
import Walker from 'objects/behaviours/Walker';

class Mummy extends Character {

    constructor(game,x,y){
      super(game,x,y);
      this.animation = new MummyAnimation(game,x,y,1);
      this.behaviour = new Walker(x,400);
      this.agility = .5;
    }

}

export default Mummy;
