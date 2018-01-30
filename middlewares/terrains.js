const { createMiddleware } = require("signalbox");
const uuid = require("uuid/v1");

const actions = require("../actions").default;
const select = require("../reducers/selectors").default;
const cube = require("../geometry/cube").default;

export const middleware = createMiddleware((cancel, before, after) => ({
  [before(actions.CHANGE_TERRAIN)](store, action) {
    const state = store.getState();

    if (!action.ring && !action.hexagon.id) {
      console.log('dd');

      action.hexagon = select("hexagons").from(state).at(
        0,
        action.hexagon.x,
        action.hexagon.y,
        action.hexagon.z
      ).toJS();

    }

    if (action.ring) {
      const ring = select("hexagons").from(state).ring(
        0,
        action.ring.x,
        action.ring.y,
        action.ring.z,
        action.ring.radius
      ).toJS();

      action.ring.hexagonIds = ring;
    }

  }
}));

export default middleware;



