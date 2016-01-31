export default class GameOverState extends Phaser.State {
  init(score) {
    // we don't have a score..
    this.score = score;
  }

  create() {
    this.state.start('GameState', true);
  }
}
