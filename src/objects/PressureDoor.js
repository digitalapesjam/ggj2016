import Sensor from './Sensor';
import DoorAnimation from 'objects/animations/DoorAnimation';

export default (id, game, system, target, sensorPos, doorPos) => {
  const sensorSpr = game.add.sprite(sensorPos.x, sensorPos.y, 'sensor');
  game.physics.enable(sensorSpr);
  sensorSpr.anchor.y = 1;
  sensorSpr.body.allowGravity = false;
  sensorSpr.body.immovable = true;
  const doorAnim = new DoorAnimation(game, doorPos.x, doorPos.y);

  let wasHit = false;
  const collision = Sensor(id, game, system, sensorSpr, target, wasHit, (isHit) => {
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
        system.remove(collision);
        doorAnim.open();
        removed = true;
      }
    }
  }
}
