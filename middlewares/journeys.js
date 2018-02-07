const { createMiddleware } = require("signalbox");

const actions = require("../actions").default;
const cube = require("../geometry/cube").default;
const select = require("../reducers/selectors").select;
const thunks = require("../thunks").default;

export const middleware = createMiddleware((cancel, before, after) => ({
  [after(actions.DEPARTURE)](store, action) {
    setTimeout(
      () => store.dispatch(thunks.arrival(action)),
      action.journey.duration
    );
  },

  [after(actions.ARRIVAL)](store, {
    journey,
    train,
    source,
    destination,
    connection,
  }) {
    const state = store.getState();
    const connections = state.get("connections");
    const stations = state.get("stations");

    let nextConnection = select.connections.nextStop(connections, {
      journey,
      train,
      source,
      destination,
      connection,
    });
    if (!nextConnection) {
      console.error(`middlewards/journeys: cant schedule departure due to no next connection`);
      return;
    }
    nextConnection = nextConnection.toJS();

    const nextDestinationId = nextConnection.destinationId;
    let nextDestination = select.stations.byId(stations, nextDestinationId);
    if (!nextDestination) {
      console.error(`middlewards/journeys: cant schedule departure due to nonexistent destination ${nextDestinationId}`);
      return;
    }
    nextDestination = nextDestination.toJS();
    console.log(nextConnection, nextDestination);

    setTimeout(
      () => store.dispatch(thunks.departure(
        train.id,
        nextDestination.x,
        nextDestination.y,
        nextDestination.z,
      )),
      500
    );
  }
}));

export default middleware;



