const cells = require("./cells").default;
const hexagons = require("./hexagons").default;
const terrains = require("./terrains").default;

const thunks = {
  ...cells,
  ...hexagons,
  ...terrains,
};

export default thunks;

