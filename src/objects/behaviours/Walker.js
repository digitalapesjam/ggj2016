export default class Walker {
  constructor(starttingPosition, range){
    this.starttingPosition = starttingPosition;
    this.range = range;
    this.walkdirection = 1;
  }

  update(enemy,game,system){
      if (Math.abs(enemy.x - this.starttingPosition) > this.range/2){
          this.walkdirection *= -1;
          enemy.damage(enemy.life);
      }
      enemy.walk(this.walkdirection);
  }
}
