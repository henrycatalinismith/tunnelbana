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
      store.dispatch(actions.abandonConnection());
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
        actions.dragTerminal(id, action.dragon.x, action.dragon.y)
      );
      return true;
    }

    return false;
  },

  [cancel(actions.GRAB_STATION)]: function startCreatingConnection(
    store,
    action
  ) {
    const stationId = action.station.id;

    const imagineConnection = actions.imagineConnection({
      sourceId: action.station.id,
      lineId: "Riverside" // todo: pick 1st empty line for this
    });
    store.dispatch(imagineConnection);

    return true;
  }
}));
