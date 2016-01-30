export default class System {
  constructor() {
    this.entities = {};
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
      entity.crate();
    }
    this.entities[id] = entity;
  }

  remove(id) {
    delete(this.entities[id]);
  }

  get(id) {
    return this.entities[id];
  }
}
