const cells = require("./cells").default;
const hexagons = require("./hexagons").default;
const stations = require("./stations").default;
const terrains = require("./terrains").default;

const thunks = {
  ...cells,
  ...hexagons,
  ...stations,
  ...terrains,
};

export default thunks;

