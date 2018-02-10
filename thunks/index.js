const cameras = require("./cameras").default;
const cells = require("./cells").default;
const connections = require("./connections").default;
const hexagons = require("./hexagons").default;
const journeys = require("./journeys").default;
const robots = require("./robots").default;
const stations = require("./stations").default;
const terrains = require("./terrains").default;
const trains = require("./trains").default;

const thunks = {
  ...cameras,
  ...cells,
  ...connections,
  ...hexagons,
  ...journeys,
  ...robots,
  ...stations,
  ...terrains,
  ...trains,
};

export default thunks;

