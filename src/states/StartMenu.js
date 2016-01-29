import RainbowText from 'objects/RainbowText';
import {GameState} from 'constants/states';

class StartMenu extends Phaser.State {

	create() {
    let center = { x: this.game.world.centerX, y: this.game.world.centerY }
    var text1 = new Phaser.Text(this.game, center.x, center.y, "Start Menu",  { font: "45px Arial", fill: "#ff0044", align: "center" } );
    console.log('this.game.stage ',this.game.stage.addChild);
    this.game.stage.addChild(text1);
    // let text = new RainbowText(this.game, center.x, center.y, "Start Menu");
    text1.anchor.set(0.5);
    this.game.state.start(GameState);
    text1.destroy();
  }
}

export default StartMenu;
