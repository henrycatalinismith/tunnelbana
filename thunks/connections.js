const actions = require("../actions").default;
const select = require("../reducers/selectors").select;
const cube = require("../geometry/cube").default;

export default {
  createConnection(x1, y1, z1, x2, y2, z2) {
    return (dispatch, getState) => {
      const state = getState();
      const stations = state.get("stations");

      const from = { x: x1, y: y1, z: z1 };
      const to = { x: x2, y: y2, z: z2 };

      const source = select.stations.at(stations, 0, x1, y1, z1).toJS();
      const destination = select.stations.at(stations, 0, x2, y2, z2).toJS();
      const line = cube.line(from, to);

      const connection = {
        id: [source.id, destination.id].join(":"),
        sourceId: source.id,
        destinationId: destination.id,
      };

      console.log(connection);
      console.log(line);

      // dispatch(
      //   actions.createConnection({
      //     connection: {},
      //     tracks: {},
      //   })
      // )
    }
  }
};
