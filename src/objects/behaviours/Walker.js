import Mummy from 'objects/Mummy';

export default class Walker {
  constructor(starttingPosition, range){
    this.starttingPosition = starttingPosition;
    this.range = range;
    this.walkdirection = 1;
    this.cooldown = false;
  }

  update(character,game,system){
      if (Math.abs(character.x - this.starttingPosition) > this.range/2){
          this.walkdirection *= -1;
      }
      character.walk(this.walkdirection);
  }

  trigger(character,other){
    if (other.__proto__ == character.__proto__){
      this.walkdirection *= -1
      character.walk(this.walkdirection);

    } else {
      if (!character.isAttacking)
        character.stop();

        character.attack();
        this.cooldown = true;
        let that=this;
        setTimeout(function () {
          that.cooldown = false;
        }, 100);
    }
  }
}
