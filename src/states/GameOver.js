export default class GameOver extends Phaser.State {
  init(score) {
    // we don't have a score..
    this.score = score;


  }
  update(){

  }
  create() {
    console.log('CREATE')
    window.camera = this.game.camera
    const that = this;
    // this.game.camera.follow = null;
    // this.game.camera.x = 0;
    // this.game.camera.y = 0;
    let center = { x: this.game.camera.bounds.centerX, y: this.game.camera.bounds.centerY }
    var text1 = new Phaser.Text(this.game, center.x, center.y, "Game Over Cestil",  { font: "45px Arial", fill: "#ff0044", align: "center" } );

    var text2 = new Phaser.Text(this.game, center.x, center.y, "Restart",  { font: "45px Arial", fill: "#ff0044", align: "center" } );
    text2.inputEnabled = true;
    text2.events.onInputDown.add( function (){
      that.state.start('GameState', true);
      text1.destroy();
      text2.destroy();
    }   );


    this.game.stage.addChild(text1);
    this.game.stage.addChild(text2);
    text1.fixedToCamera = true;
    text1.anchor.set(0.5);
    console.log(this.game.camera);

    //

  }
}
