const cells = require("./cells").default;
const hexagons = require("./hexagons").default;
const stations = require("./stations").default;
const viewport = require("./viewport").default;

const actions = Object.assign({},
  cells,
  hexagons,
  stations,
  viewport
);

export default actions;



