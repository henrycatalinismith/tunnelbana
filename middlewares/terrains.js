const { createMiddleware } = require("signalbox");
const uuid = require("uuid/v1");

const actions = require("../actions").default;
const select = require("../reducers/selectors").default;
const cube = require("../geometry/cube").default;

export const middleware = createMiddleware((cancel, before, after) => ({
 // lol
}));

export default middleware;



