const { createSelectors } = require("signalbox");

const actors = require("./actors");
const camera = require("./camera");
const cells = require("./cells");
const hexagons = require("./hexagons");
const viewport = require("./viewport");

const selectors = createSelectors({
  actors: actors.selectors,
  camera: camera.selectors,
  cells: cells.selectors,
  hexagons: hexagons.selectors,
  viewport: viewport.selectors,
});

export default selectors;

