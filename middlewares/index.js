const { createMiddleware } = require("signalbox");

const actors = require("./actors").default;
const cells = require("./cells").default;
const hexagons = require("./hexagons").default;
const viewport = require("./viewport").default;

export default createMiddleware([
  actors,
  cells,
  hexagons,
  viewport,
]);

