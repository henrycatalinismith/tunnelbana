const cameras = require("./cameras").default;
const cells = require("./cells").default;
const connections = require("./connections").default;
const hexagons = require("./hexagons").default;
const stations = require("./stations").default;
const terrains = require("./terrains").default;
const tracks = require("./tracks").default;
const viewport = require("./viewport").default;

const actions = Object.assign({},
  cameras,
  cells,
  connections,
  hexagons,
  stations,
  terrains,
  tracks,
  viewport
);

export default actions;



