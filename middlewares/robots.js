const { createMiddleware } = require("signalbox");

const actions = require("../actions").default;

export const middleware = createMiddleware((cancel, before, after) => ({
  [before(actions.CREATE_ROBOT)](store, action) {
    // hi
  }
}));

export default middleware;


