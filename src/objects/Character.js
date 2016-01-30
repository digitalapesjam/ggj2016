export default class Character {

      constructor(game, x, y) {
        this.x = x;
        this.y = y;
        this.life = 1;
        this.armor = 1;
        this.agility = 1;
      }

      isAlive(){
        return this.life > 0;
      }

      update(game,system) {
          if (!!this.behaviour && this.isAlive())
            this.behaviour.update(this,game,system);
      }

      stop() {
        if (!!this.animation)
            this.animation.stop();
      }

      walk(speed){
        if (this.isAlive()) {
          this.x += speed*this.agility;
          if (!!this.animation) {
            this.animation.walk(speed*this.agility);
            this.animation.sprite.x = this.x;
          }
        }
      }

      attack(){
        if (!!this.animation && this.isAlive())
          this.animation.attack();
      }

      damage(amount){
        this.life -= amount*this.armor;
        if (!this.isAlive()){
          this.stop();
          this.animation.die();
        }
      }

}
