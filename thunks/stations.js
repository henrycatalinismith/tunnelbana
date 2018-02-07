const actions = require("../actions").default;
const select = require("../reducers/selectors").default;

export default {
  createStation(x, y, z) {
    return (dispatch, getState) => {
      const hexagon = select("hexagons")
        .from(getState())
        .at(0, x, y, z)
        .toJS();

      const station = {
        id: hexagon.id,
        hexagonId: hexagon.id,
        cellId: hexagon.cellId,
        x,
        y,
        z,
      };

      const action = actions.createStation(station);
      dispatch(action);
    }
  }
};
