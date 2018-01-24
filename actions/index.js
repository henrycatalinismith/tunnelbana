const actors = require("./actors").default;
const hexagons = require("./hexagons").default;
const viewport = require("./viewport").default;

const actions = Object.assign({}, actors, hexagons, viewport);

export default actions;



