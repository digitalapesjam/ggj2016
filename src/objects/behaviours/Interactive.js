export default class Interactive {
  constructor(game, starttingPosition, range){
    this.starttingPosition = starttingPosition;
    this.range = range;
    this.walkdirection = 1;
    this.cursors = game.input.keyboard.createCursorKeys();
  }

  update(entity,game,system){
      if(this.cursors.left.isDown) {
        this.walkdirection = -1;
        entity.walk(this.walkdirection);
      }else if(this.cursors.right.isDown) {
        this.walkdirection = 1;
        entity.walk(this.walkdirection);
      }


      // if (Math.abs(enemy.x - this.starttingPosition) > this.range/2){
      //     this.walkdirection *= -1;
      //     enemy.damage(enemy.life);
      // }
      // enemy.walk(this.walkdirection);
  }
}
