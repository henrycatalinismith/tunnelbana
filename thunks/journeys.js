const { TweenLite, TweenMax, Linear } = require("gsap");

const actions = require("../actions").default;
const select = require("../reducers/selectors").select;
const cube = require("../geometry/cube").default;

let id = 0;

export default {
  departure(trainId, x, y, z) {
    return (dispatch, getState) => {
      const state = getState();
      const connections = state.get("connections");
      const hexagons = state.get("hexagons");
      const stations = state.get("stations");
      const terrains = state.get("terrains");
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

      let tracks = select.tracks.byConnection(state.get("tracks"), connection.id);
      if (tracks.size < 1) {
        console.error(`thunks/journeys: cant depart due to nonexistent tracks between ${source.id} and ${destination.id}`);
        return;
      }
      tracks = tracks.toJS();
      console.log(tracks);

      const firstTrackOrigin = {
        x: tracks[0].x1,
        y: tracks[0].y1,
        z: tracks[0].z1,
      };

      if (cube.distance(source, firstTrackOrigin)) {
        tracks = tracks.reverse().map(t => {
          return {
            ...t,
            x1: t.x2,
            y1: t.y2,
            z1: t.z2,
            x2: t.x1,
            y2: t.y1,
            z2: t.z1,
          };
        });
      }

      const tweens = [];
      for (let track of tracks) {
        const trackFrom = { x: track.x1, y: track.y1, z: track.z1 };
        const trackTo = { x: track.x2, y: track.y2, z: track.z2 };

        const from = cube.pixels(trackFrom, 50);
        const to = cube.pixels(trackTo, 50);
        from.y -= sourceHexagon.terrainHeight;
        to.y -= destinationHexagon.terrainHeight;

        tweens.push(
          TweenLite.fromTo(`#train0`, 1 / train.speed, from, {
            ...to,
            ease: Linear.easeNone,
            delay: tweens.length * (1 / train.speed),
          })
        );
      }


      const journey = {
        id,
        trainId: train.id,
        sourceId: source.id,
        destinationId: destination.id,
        connectionId: connection.id,
        duration: tweens.length * (1 / train.speed) * 1000,
      };

      const departure = actions.departure({
        journey,
        train,
        source,
        destination,
        connection,
      });

      const tl = new TimelineMax({ tweens });
      tl.play();

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



