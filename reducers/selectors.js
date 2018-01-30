const { createSelectors } = require("signalbox");

const actors = require("./actors");
const cameras = require("./cameras");
const cells = require("./cells");
const hexagons = require("./hexagons");
const stations = require("./stations");
const terrain = require("./terrain");
const viewport = require("./viewport");

const selectors = createSelectors({
  actors: actors.selectors,
  cameras: cameras.selectors,
  cells: cells.selectors,
  hexagons: hexagons.selectors,
  stations: stations.selectors,
  terrain: terrain.selectors,
  viewport: viewport.selectors,
});

export default selectors;

