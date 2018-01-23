const { createMiddleware } = require("signalbox");
const actions = require("../actions").default;

export const middleware = createMiddleware((cancel, before, after) => ({
  [after(actions.RESIZE_VIEWPORT)](store) {
    console.log("hey!");
  }
}));

export default middleware;


