const actors = require("./actors").default;
const cells = require("./cells").default;
const hexagons = require("./hexagons").default;
const viewport = require("./viewport").default;

const actions = Object.assign({},
  actors,
  cells,
  hexagons,
  viewport
);

export default actions;



