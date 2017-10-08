import { createMiddleware } from "signalbox";
import uuid from "uuid/v1";
import actions from "../actions";
import { select } from "../reducers";

export const middleware = createMiddleware((before, after, cancel) => ({
  [cancel(actions.DRAGON_DROP)]: function redispatchMoreSpecificDragonDrop(
    store,
    action
  ) {
    if (action.dragon.entity === "terminal" && !!action.dragon.id) {
      store.dispatch(actions.dragonDropTerminal(action.dragon.id));
      return true;
    }
  },

  [cancel(actions.DRAGON_MOVE)]: function redispatchMoreSpecificDragonMove(
    store,
    action
  ) {
    const dragon = store.getState().get("dragon");
    const entity = dragon.get("entity");
    const id = dragon.get("id");

    if (entity === "terminal" && !!id) {
      store.dispatch(
        actions.dragonMoveTerminal(action.dragon.x, action.dragon.y, id)
      );
      return true;
    }

    return false;
  },

  [cancel(actions.DRAGON_GRAB_STATION)]: function startCreatingConnection(
    store,
    action
  ) {
    const stationId = action.station.id;
    const connectionId = uuid();
    const terminalId = uuid();

    store.dispatch(
      actions.createConnection({
        id: connectionId,
        sourceId: stationId,
        lineId: "Riverside" // todo: pick 1st empty line for this
      })
    );

    store.dispatch(
      actions.createTerminal({
        id: uuid(),
        connectionId,
        stationId,
        lineId: "Riverside" // todo: pick 1st empty line for this
      })
    );

    store.dispatch(
      actions.createTerminal({
        id: terminalId,
        connectionId,
        lineId: "Riverside" // todo: pick 1st empty line for this
      })
    );

    store.dispatch(actions.dragonGrabTerminal(terminalId));

    return true;
  },

  [cancel(actions.DRAGON_CREATE_CONNECTION)]: function finishCreatingConnection(
    store,
    action
  ) {
    const state = store.getState();

    const dragon = store
      .getState()
      .get("dragon")
      .toJS();

    const terminal = select("terminals")
      .from(state)
      .byId(dragon.id)
      .toJS();

    const connection = select("connections")
      .from(state)
      .byId(terminal.connectionId)
      .toJS();

    const lineId = connection.lineId;
    const sourceId = connection.sourceId;
    const destinationId = action.connection.destinationId;

    if (sourceId === destinationId) {
      // this has only fired because the mouse has re-entered the origin
      // station and obviously we don't want to connect the station to itself
      // so just cancel this completely
      return true;
    }

    store.dispatch(
      actions.updateConnection({
        id: connection.id,
        destinationId
      })
    );

    const newId = uuid();
    store.dispatch(
      actions.createConnection({
        id: newId,
        sourceId: destinationId,
        lineId: "Riverside" // todo: pick 1st empty line for this
      })
    );

    store.dispatch(
      actions.updateTerminal({
        id: terminal.id,
        connectionId: newId
      })
    );

    return true;
  }
}));
