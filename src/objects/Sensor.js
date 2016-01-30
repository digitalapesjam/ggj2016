export default (game, collisions, sensor, target, defaultHit, onHit) => {
  const coll = {
    checkCollision: () => {
      let hit = sensor.overlap(target); //game.physics.arcade.intersects(sensor, target);
      onHit(hit);
    }
  };
  collisions.addCollision(coll);
  return coll;
}
