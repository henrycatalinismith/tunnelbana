const cameras = require("./cameras").default;
const cells = require("./cells").default;
const hexagons = require("./hexagons").default;
const stations = require("./stations").default;
const terrains = require("./terrains").default;

const thunks = {
  ...cameras,
  ...cells,
  ...hexagons,
  ...stations,
  ...terrains,
};

export default thunks;

