const { createSelectors } = require("signalbox");

const cameras = require("./cameras");
const cells = require("./cells");
const hexagons = require("./hexagons");
const stations = require("./stations");
const terrains = require("./terrains");
const viewport = require("./viewport");

const selectors = createSelectors({
  cameras: cameras.selectors,
  cells: cells.selectors,
  hexagons: hexagons.selectors,
  stations: stations.selectors,
  terrains: terrains.selectors,
  viewport: viewport.selectors,
});

export default selectors;

