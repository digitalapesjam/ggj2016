export default class Enemy {

      constructor(game, x, y) {
        this.x = x;
        this.y = y;
        this.life = 1;
        this.armor = 1;
        this.agility = 1;
      }

      update(game,system) {
          if (!!this.behaviour)
            this.behaviour.update(this,game,system);
      }

      stop() {
        if (!!this.animation)
          this.animation.stop();
      }

      walk(speed){
        this.x += speed*this.agility;
        if (!!this.animation) {
          this.animation.walk(speed*this.agility);
          this.animation.sprite.x = this.x;
        }
      }

      attack(){
        if (!!this.animation)
          this.animation.attack();
      }

      damege(amount){
        this.life -= amount*this.armor;
      }
}
