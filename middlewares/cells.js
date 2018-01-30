const { createMiddleware } = require("signalbox");
const uuid = require("uuid/v1");

const actions = require("../actions").default;
let id = 0;

export const middleware = createMiddleware((cancel, before, after) => ({
  [before(actions.CREATE_CELL)](store, action) {
    if (!action.cell.id) {
      action.cell.id = id++;
    }
  }
}));

export default middleware;


