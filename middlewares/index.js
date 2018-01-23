const { createMiddleware } = require("signalbox");

const actors = require("./actors").default;
const viewport = require("./viewport").default;

export default createMiddleware([
  actors,
  viewport,
]);

