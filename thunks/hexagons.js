const actions = require("../actions").default;
const select = require("../reducers/selectors").default;
const cube = require("../geometry/cube").default;

let cellId = 0;

export default {
  changeTerrain(terrainId, x, y, z) {
    return (dispatch, getState) => {
      const hexagon = select("hexagons")
        .from(getState())
        .at(0, x, y, z)
        .toJS();

      hexagon.terrainId = terrainId;

      const action = actions.changeTerrains([hexagon]);
      dispatch(action);
    }
  },

  changeTerrainRing(terrainId, x, y, z, radius) {
    return (dispatch, getState) => {
      const ring = select("hexagons")
        .from(getState())
        .ring(0, x, y, z, radius)
        .toJS()
        .map(hex => ({ ...hex, terrainId }));

      const action = actions.changeTerrains(ring);
      dispatch(action);
    }
  }
};



