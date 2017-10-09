import { createMiddleware } from "signalbox";
import uuid from "uuid/v1";
import actions from "../actions";
import { select } from "../reducers";

export const middleware = createMiddleware((before, after, cancel) => ({
  [before(actions.CREATE_CONNECTION)]: function inferConnectionProperties(
    store,
    action
  ) {
    if (!action.connection.id) {
      action.connection.id = uuid();
    }
  },

  [before(actions.IMAGINE_CONNECTION)]: function inferConnectionProperties(
    store,
    action
  ) {
    if (!action.connection.id) {
      action.connection.id = uuid();
    }

    action.sourceTerminal = {
      id: uuid(),
      connectionId: action.connection.id,
      stationId: action.source.id,
      lineId: "Riverside" // todo: pick 1st empty line for this
    };

    action.destinationTerminal = {
      id: uuid(),
      connectionId: action.connection.id,
      lineId: "Riverside"
    };
  },

  [before(actions.REALIZE_CONNECTION)]: function hydrateNewlyRealizedConnection(
    store,
    action
  ) {
    const state = store.getState();
    const connection = select("connections")
      .from(state)
      .imaginary()
      .toJS();
    action.connection = { id: connection.id };
    action.line = { id: connection.lineId };
    action.source = { id: connection.sourceId };
  },

  [after(actions.REALIZE_CONNECTION)]: function imagineNextConnection(
    store,
    action
  ) {
    const imagineConnection = actions.imagineConnection({
      sourceId: action.destination.id,
      lineId: "Riverside" // todo: pick 1st empty line for this
    });
    store.dispatch(imagineConnection);
  },

  [before(actions.ABANDON_CONNECTION)]: function hydrateNewlyRealizedConnection(
    store,
    action
  ) {
    const state = store.getState();
    const connection = select("connections")
      .from(state)
      .imaginary()
      .toJS();
    action.connection = { id: connection.id };
    action.line = { id: connection.lineId };
    action.source = { id: connection.sourceId };
  }
}));
