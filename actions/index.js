const cells = require("./cells").default;
const hexagons = require("./hexagons").default;
const stations = require("./stations").default;
const terrains = require("./terrains").default;
const viewport = require("./viewport").default;

const actions = Object.assign({},
  cells,
  hexagons,
  stations,
  terrains,
  viewport
);

export default actions;



