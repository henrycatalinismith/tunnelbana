const { createMiddleware } = require("signalbox");

const actions = require("../actions").default;
const cube = require("../geometry/cube").default;
const thunks = require("../thunks").default;

export const middleware = createMiddleware((cancel, before, after) => ({
  [after(actions.DEPARTURE)](store, action) {
    setTimeout(
      () => store.dispatch(thunks.arrival(action)),
      action.journey.duration
    );
  }
}));

export default middleware;



