const { createMiddleware } = require("signalbox");

const cameras = require("./cameras").default;
const cells = require("./cells").default;
const hexagons = require("./hexagons").default;
const stations = require("./stations").default;
const terrains = require("./terrains").default;
const viewport = require("./viewport").default;

export default createMiddleware([
  cameras,
  cells,
  hexagons,
  stations,
  terrains,
  viewport,
]);

