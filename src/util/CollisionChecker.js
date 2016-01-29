export default class CollisionChecker {
  constructor(game) {
    this.game = game;
    this.colliders = [];
  }

  addCollision(collision) {
    collision._collision_manager = this;
    this.colliders[this.colliders.length] = collision;
  }

  removeCollision(collision) {
    let i = this.colliders.indexOf(collision);
    if (i > -1) {
      this.colliders.splice(i, 1);
    }
  }

  checkCollisions() {
    let game = this.game;
    this.colliders.forEach(cs => {
      cs.checkCollision(game);
    });
  }
}
