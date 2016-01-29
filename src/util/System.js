export default class System {
  constructor() {
    this.layers = [];
  }

  update(game) {
    this.layers.forEach(layer => {
      if (!!layer) {
        for (var k in layer) {
          if (layer.hasOwnProperty(k)) {
            layer[k].update(game);
          }
        }
        // Object.values(layer).forEach(entity => {
        //   entity.update(game);
        // })
      }
    })
  }

  register(layer, id, entity) {
    if (!!!this.layers[layer]) {
      this.layers[layer] = {}
    }
    if (entity.create) {
      entity.crate();
    }
    this.layers[layer][id] = entity;
  }

  remove(layer, id) {
    delete(this.layers[layer][id]);
  }

  get(layer, id) {
    return this.layers[layer][id];
  }
}
