const { createMiddleware } = require("signalbox");
const uuid = require("uuid/v1");

const actions = require("../actions").default;
const select = require("../reducers/selectors").default;

export const middleware = createMiddleware((cancel, before, after) => ({
  [before(actions.CREATE_STATION)](store, action) {
    if (!action.cell.id) {
      const state = store.getState();
      const hexagon = select("hexagons").from(state).byId(action.hexagon.id);
      action.cell.id = hexagon.cellId;
    }
  }
}));

export default middleware;


