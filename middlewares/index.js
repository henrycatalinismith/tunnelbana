const { createMiddleware } = require("signalbox");

const viewport = require("./viewport");

export default createMiddleware([
  viewport,
]);

