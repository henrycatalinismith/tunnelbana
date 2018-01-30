const { createMiddleware } = require("signalbox");

const actors = require("./actors").default;
const cameras = require("./cameras").default;
const cells = require("./cells").default;
const hexagons = require("./hexagons").default;
const stations = require("./stations").default;
const viewport = require("./viewport").default;

export default createMiddleware([
  actors,
  cameras,
  cells,
  hexagons,
  stations,
  viewport,
]);

