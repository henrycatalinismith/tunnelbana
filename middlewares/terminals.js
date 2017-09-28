import uuid from "uuid/v1";
import actions from "../actions";
import { select } from "../reducers";

export function addTerminalForNewConnection(store, { connection }) {
  const { lineId, sourceId, destinationId } = connection;

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
        id: uuid(),
        connectionId: connection.id,
        lineId,
        stationId: connection.sourceId,
        x: source.x,
        y: source.y
      })
    );

    store.dispatch(
      actions.addTerminal({
        id: uuid(),
        connectionId: connection.id,
        lineId,
        stationId: connection.destinationId,
        x: destination.x,
        y: destination.y
      })
    );
  }
}
