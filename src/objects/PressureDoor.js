import Sensor from './Sensor';
import DoorAnimation from 'objects/animations/DoorAnimation';

export default (game, collisions, target, sensorPos, doorPos) => {
  const sensorSpr = game.add.sprite(sensorPos.x, sensorPos.y, 'sensor');
  const doorAnim = new DoorAnimation(game, doorPos.x, doorPos.y);

  let wasHit = false;
  Sensor(game, collisions, sensorSpr, target, wasHit, (isHit) => {
    if (isHit !== wasHit) {
      if (isHit) {
        doorAnim.open();
      } else {
        doorAnim.close();
      }
      wasHit = isHit;
    }
  });
}
