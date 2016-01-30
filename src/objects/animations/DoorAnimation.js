export default class DoorAnimation {
  constructor(game, x, y) {
    this.sprite = game.add.sprite(x, y, DoorAnimation.label);
    game.physics.enable(this.sprite);
    this.sprite.body.allowGravity = false;
    this.sprite.anchor.y = 1;
    this.sprite.animations.add('door_open', [0]);
    this.sprite.animations.add('door_close', [1]);
    this.close();
  }

  open() {
    this.sprite.play('door_open', 20);
  }
  close() {
    this.sprite.play('door_close', 20);
  }
}

DoorAnimation.path = 'assets/sprites/door.png';
DoorAnimation.label = 'door';
