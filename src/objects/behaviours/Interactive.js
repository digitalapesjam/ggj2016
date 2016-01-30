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
    }else if(this.cursors.down.isDown){
      entity.attack();
      console.log('down ',entity);
      // entity.stop()
    }else{
      entity.stop()
    }
  }
  
  trigger(character,other){

  }

}
