const { createMiddleware } = require("signalbox");
const uuid = require("uuid/v1");

const actions = require("../actions").default;

export const middleware = createMiddleware((cancel, before, after) => ({
  [before(actions.CREATE_HEXAGON)](store, action) {
    if (!action.hexagon.id) {
      action.hexagon.id = uuid();
    }
  }
}));

export default middleware;



