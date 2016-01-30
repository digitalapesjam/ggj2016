import Sensor from './Sensor';

export default (game, collisions, plateSprite, targetSprite, doorSprite, onOpen, onClose) => {
  let wasHit = false;
  Sensor(game, collisions, plateSprite, targetSprite, wasHit, (isHit) => {
    if (isHit !== wasHit) {
      if (isHit) {
        onOpen();
      } else {
        onClose();
      }
      wasHit = isHit;
    }
  });
}
