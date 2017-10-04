import { createMiddleware } from "signalbox";
import uuid from "uuid/v1";
import actions from "../actions";
import { select } from "../reducers";

export const middleware = createMiddleware((before, after, cancel) => ({
  [before(actions.ADD_TERMINAL)](store, action) {
    if (!action.terminal.id) {
      action.terminal.id = uuid();
    }
  },

  [after(actions.ADD_CONNECTION)](store, { connection }) {
    const { lineId, sourceId, destinationId } = connection;
    if (!destinationId) {
      return;
    }

    const state = store.getState();
    const connections = state.get("connections");
    const stations = store.getState().get("stations");

    const source = select("stations")
      .from(state)
      .byId(sourceId)
      .toJS();

    const destination = select("stations")
      .from(state)
      .byId(destinationId)
      .toJS();

    const siblings = select("connections")
      .from(state)
      .byLineId(lineId)
      .toJS();

    if (siblings.length === 0) {
      store.dispatch(
        actions.addTerminal({
          connectionId: connection.id,
          lineId,
          stationId: connection.sourceId,
          x: source.x,
          y: source.y
        })
      );

      store.dispatch(
        actions.addTerminal({
          connectionId: connection.id,
          lineId,
          stationId: connection.destinationId,
          x: destination.x,
          y: destination.y
        })
      );
    }
  },

  [after(actions.DRAGON_DROP_TERMINAL)](store, action) {
    const { id: terminalId } = action.terminal;
    const state = store.getState();

    const terminal = select("terminals")
      .from(state)
      .byId(terminalId)
      .toJS();

    const lineId = terminal.lineId;
    const connection = select("connections")
      .from(state)
      .byId(terminal.connectionId)
      .toJS();

    const tracks = select("tracks")
      .from(state)
      .byConnectionId(connection.id)
      .toJS();

    const otherTerminal = select("terminals")
      .from(state)
      .byLineAndStation(lineId, connection.sourceId)
      .toJS();

    store.dispatch(actions.deleteTerminal(terminal.id));
    store.dispatch(actions.deleteTerminal(otherTerminal.id));
    tracks.forEach(track => store.dispatch(actions.deleteTrack(track.id)));
  }
}));
