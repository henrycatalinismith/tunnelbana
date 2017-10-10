import { createMiddleware } from "signalbox";
import uuid from "uuid/v1";
import actions from "../actions";
import { select } from "../reducers";

export const middleware = createMiddleware((before, after, cancel) => ({
  [before(actions.CREATE_CONNECTION)]: function inferNewConnectionProperties(
    store,
    action
  ) {
    if (!action.connection.id) {
      action.connection.id = uuid();
    }
  },

  [before(
    actions.IMAGINE_CONNECTION
  )]: function inferImaginaryConnectionProperties(store, action) {
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

  // https://github.com/railcar/energetic-headlight/commit/77fe402592600d82a411a9fe48206c16e265ae1e#commitcomment-24866416
  [cancel(actions.REALIZE_CONNECTION)]: function cancelRecursiveConnection(
    store,
    action
  ) {
    const state = store.getState();
    const connection = select("connections")
      .from(state)
      .imaginary()
      .toJS();

    const sourceId = connection.sourceId;
    const destinationId = action.destination.id;
    const isRecursive = sourceId === destinationId;

    return isRecursive;
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
