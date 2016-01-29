import Enemy from 'objects/Enemy';
import MummyAnimation from 'objects/animations/MummyAnimation';
import Walker from 'objects/behaviours/Walker';

class Mummy extends Enemy {

    constructor(game,x,y){
      super(game,x,y);
      this.animation = new MummyAnimation(game,x,y,4);
      this.behaviour = new Walker();
      this.agility = .5;
    }

}

export default Mummy;
