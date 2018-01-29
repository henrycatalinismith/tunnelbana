const { createMiddleware } = require("signalbox");

const actors = require("./actors").default;
const camera = require("./camera").default;
const cells = require("./cells").default;
const hexagons = require("./hexagons").default;
const viewport = require("./viewport").default;

export default createMiddleware([
  actors,
  camera,
  cells,
  hexagons,
  viewport,
]);

