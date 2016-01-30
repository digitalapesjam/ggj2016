export default class Walker {
  constructor(starttingPosition, range){
    this.starttingPosition = starttingPosition;
    this.range = range;
    this.walkdirection = 1;
    this.cooldown = false;
  }

  update(enemy,game,system){
      if (Math.abs(enemy.x - this.starttingPosition) > this.range/2){
          this.walkdirection *= -1;
      }
      if (Math.abs(enemy.x - this.starttingPosition) == this.range/4 && !this.cooldown){
          enemy.attack();
          this.cooldown = true;
          let that=this;
          setTimeout(function () {
            that.cooldown = false;
          }, 100);
      }
      enemy.walk(this.walkdirection);
  }
}
