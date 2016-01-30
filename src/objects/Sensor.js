export default (id, game, system, sensor, target, defaultHit, onHit) => {
  const coll = {
    update: () => {
      let hit = sensor.overlap(target); //game.physics.arcade.intersects(sensor, target);
      onHit(hit);
    }
  };
  system.register(id, coll);
  return coll;
}
