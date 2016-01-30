import Sensor from './Sensor';
import DoorAnimation from 'objects/animations/DoorAnimation';

export default (game, collisions, target, sensorPos, doorPos) => {
  const sensorSpr = game.add.sprite(sensorPos.x, sensorPos.y, 'sensor');
  game.physics.enable(sensorSpr);
  sensorSpr.anchor.y = 1;
  sensorSpr.body.allowGravity = false;
  sensorSpr.body.immovable = true;
  const doorAnim = new DoorAnimation(game, doorPos.x, doorPos.y);

  let wasHit = false;
  const collision = Sensor(game, collisions, sensorSpr, target, wasHit, (isHit) => {
    if (isHit !== wasHit) {
      if (isHit) {
        doorAnim.open();
      } else {
        doorAnim.close();
      }
      wasHit = isHit;
    }
  });

  let removed = false;
  return () => {
    if (!removed) {
      if (wasHit) {
        collisions.removeCollision(collision);
        doorAnim.open();
        removed = true;
      }
    }
  }
}
