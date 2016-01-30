export default class System {
  constructor(game) {
    this.entities = {};
    this.colliders = [];
    this.collidersEntity = {};
    this.game = game;
    game.physics.startSystem(Phaser.Physics.ARCADE);
  }

  update(game) {
    const that = this;
    const ents = this.entities;
    for (var k in ents) {
      if (ents.hasOwnProperty(k)) {
        ents[k].update(game, that);
      }
    }
        // Object.values(layer).forEach(entity => {
        //   entity.update(game);
        // })
  }

  register(id, entity) {
    if (entity.create) {
      entity.create();
    }
    this.entities[id] = entity;

    if (!!entity.animation.sprite.body){
      this.colliders.push(entity.animation.sprite);
      this.collidersEntity[entity.animation.sprite] = entity;
    }
  }

  remove(id) {
    delete(this.entities[id]);
  }

  get(id) {
    return this.entities[id];
  }

  getCollidersEntity(sprite){
    return this.collidersEntity[sprite];
  }
}
