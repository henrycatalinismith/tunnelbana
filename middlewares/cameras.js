const { createMiddleware } = require("signalbox");
const uuid = require("uuid/v1");

const cube = require("../geometry/cube").default;
const actions = require("../actions").default;
const select = require("../reducers/selectors").default;

export const middleware = createMiddleware((cancel, before, after) => ({
  [before(actions.SELECT_HEXAGON)](store, action) {
    const state = store.getState();
    const hexagon = select("hexagons").from(state).byId(action.hexagon.id);

    const point = cube.pixels(hexagon, 50);
    action.camera = {
      x: point.x,
      y: point.y,
    };
  }
}));

export default middleware;


