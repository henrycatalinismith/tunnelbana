const { createSelectors } = require("signalbox");

const cameras = require("./cameras");
const cells = require("./cells");
const hexagons = require("./hexagons");
const stations = require("./stations");
const terrains = require("./terrains");
const viewport = require("./viewport");

export const select = {
  cameras: cameras.selectors,
  cells: cells.selectors,
  hexagons: hexagons.selectors,
  stations: stations.selectors,
  terrains: terrains.selectors,
  viewport: viewport.selectors,
};

const selectors = createSelectors(select, { stateAccessor: (s, entity) => s.get(entity) });

export default selectors;

