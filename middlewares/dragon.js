import { createMiddleware } from "signalbox";
import uuid from "uuid/v1";
import actions from "../actions";
import { select } from "../reducers";

export const middleware = createMiddleware((before, after, cancel) => ({
  [cancel(actions.DRAGON_DROP)](store, action) {
    if (action.entity === "terminal" && !!action.id) {
      store.dispatch(actions.dragonDropTerminal(action.id));
      return true;
    }
  },

  [cancel(actions.DRAGON_GRAB_STATION)](store, action) {
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

  [cancel(actions.DRAGON_MOVE)](store, action) {
    const dragon = store.getState().get("dragon");
    const entity = dragon.get("entity");
    const id = dragon.get("id");

    if (entity === "station" && !!id) {
      store.dispatch(actions.dragonMoveStation(action.x, action.y, id));
      return true;
    }

    if (entity === "terminal" && !!id) {
      store.dispatch(actions.dragonMoveTerminal(action.x, action.y, id));
      return true;
    }

    return false;
  }
}));
