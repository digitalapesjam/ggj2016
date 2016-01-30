import Character from 'objects/Character';
import PlayerAnimation from 'objects/animations/PlayerAnimation';
import Interactive from 'objects/behaviours/Interactive';

class Player extends Character {

    constructor(game,x,y){
      super(game,x,y);
      this.animation = new PlayerAnimation(game,x,y,1);
      this.behaviour = new Interactive(game, x,100);
      this.agility = .5;
    }

}

export default Player;
