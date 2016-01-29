export default class Walker {
  constructor(){
    this.walkdirection = 1;
  }

  update(enemy,game,system){
      if (!!this.start){
          if (game.time.time - this.start > 8000){
            this.walkdirection *= -1;
            this.start = game.time.time;
          }
          enemy.walk(this.walkdirection);
      } else {
        this.start =game.time.time;
      }
  }
}
