const { TweenLite } = require("gsap");

const actions = require("../actions").default;
const select = require("../reducers/selectors").select;
const cube = require("../geometry/cube").default;

let id = 0;

export default {
  departure(trainId, x, y, z) {
    return (dispatch, getState) => {
      const state = getState();
      const hexagons = state.get("hexagons");
      const terrains = state.get("terrains");
      const connections = state.get("connections");
      const stations = state.get("stations");
      const trains = state.get("trains");

      let train = select.trains.byId(trains, trainId);
      if (!train) {
        console.error(`thunks/journeys: cant depart nonexistent train ${trainId}`);
        return;
      }
      train = train.toJS();

      let sourceHexagon = select.hexagons.at(hexagons, 0, train.x, train.y, train.z);
      if (!sourceHexagon) {
        console.error(`thunks/journeys: cant depart from nonexistent source hexagon 0,${train.x},${train.y},${train.z}`);
        return;
      }
      sourceHexagon = sourceHexagon.toJS();

      let destinationHexagon = select.hexagons.at(hexagons, 0, x, y, z);
      if (!destinationHexagon) {
        console.error(`thunks/journeys: cant depart to nonexistent destination hexagon 0,${x},${y},${z}`);
        return;
      }
      destinationHexagon = destinationHexagon.toJS();

      let source = select.stations.at(stations, 0, train.x, train.y, train.z);
      if (!source) {
        console.error(`thunks/journeys: cant depart from nonexistent source 0,${train.x},${train.y},${train.z}`);
        return;
      }
      source = source.toJS();

      let destination = select.stations.at(stations, 0, x, y, z);
      if (!destination) {
        console.error(`thunks/journeys: cant depart to nonexistent destination 0,${x},${y},${z}`);
        return;
      }
      destination = destination.toJS();

      let connection = select.connections.between(connections, source.id, destination.id);
      if (!connection) {
        console.error(`thunks/journeys: cant depart due to nonexistent connection between ${source.id} and ${destination.id}`);
        return;
      }
      connection = connection.toJS();

      const from = cube.pixels(source, 50);
      const to = cube.pixels(destination, 50);
      from.y -= sourceHexagon.terrainHeight;
      to.y -= destinationHexagon.terrainHeight;

      const journey = {
        id,
        trainId: train.id,
        sourceId: source.id,
        destinationId: destination.id,
        connectionId: connection.id,
        duration: 2000
      };

      const departure = actions.departure({
        journey,
        train,
        source,
        destination,
        connection,
      });

      TweenLite.fromTo(`#train0`, journey.duration / 1000, from, to);
      dispatch(departure);
      id++;
    }
  },

  arrival({
    journey,
    train,
    source,
    destination,
    connection,
  }) {
    return (dispatch, getState) => {
      const arrival = actions.arrival({
        journey,
        train,
        source,
        destination,
        connection,
      });

      dispatch(arrival);
    };
  }
};



