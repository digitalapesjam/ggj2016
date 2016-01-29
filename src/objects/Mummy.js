import Enemy from 'objects/Enemy';
import MummyAnimation from 'objects/animations/MummyAnimation';

class Mummy extends Enemy {

    constructor(game,x,y){
      super(game,x,y);
      this.animation = new MummyAnimation(game,x,y);
    }

}

export default Mummy;
