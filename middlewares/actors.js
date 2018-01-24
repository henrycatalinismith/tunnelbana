const { createMiddleware } = require("signalbox");
const uuid = require("uuid/v1");

const actions = require("../actions").default;

export const middleware = createMiddleware((cancel, before, after) => ({
  [before(actions.CREATE_ACTOR)](store, action) {
    if (!action.actor.id) {
      action.actor.id = Math.random() + "";
    }
  }
}));

export default middleware;


