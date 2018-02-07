const actions = require("../actions").default;
const select = require("../reducers/selectors").default;
const cube = require("../geometry/cube").default;

let id = 0;

export default {
  createTrain(x, y, z) {
    return (dispatch, getState) => {
      const camera = select("cameras")
        .from(getState())
        .byId("main")
        .toJS();

      const hexagon = select("hexagons")
        .from(getState())
        .at(0, x, y, z)
        .toJS();

      const train = {
        id: id + "",
      };

      const terrain = { id: hexagon.terrainId };

      const cell = { id: camera.cellId };
      const station = { id: hexagon.id };

      const action = actions.createTrain({ train, hexagon, cell, terrain, station });
      dispatch(action);
      id++;
    };
  }
};



