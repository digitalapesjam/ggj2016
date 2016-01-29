export default class Enemy {

      constructor(game, x, y) {
        this.x = x;
        this.y = y;
        this.life = 1;
        this.armor = 1;
        this.speed = 1;
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
        this.x += this.speed*speed;
        if (!!this.animation)
          animation.walk(speed);
      }

      attack(){
        if (!!this.animation)
          animation.attack();
      }

      damege(amount){
        this.life -= amount*this.armor;
      }
}
