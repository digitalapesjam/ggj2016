import SimpleCollision from 'collisions/SimpleCollision';

export default (game, collisions, sensor, target, defaultHit, onHit) => {
  collisions.addCollision({
    checkCollision: () => {
      let hit = game.physics.arcade.intersects(sensor, target);
      onHit(hit);
    }
  });
}
