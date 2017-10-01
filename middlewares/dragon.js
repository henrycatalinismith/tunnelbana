import { createMiddleware } from "signalbox";
import actions from "../actions";
import { select } from "../reducers";

export const middleware = createMiddleware((before, after, cancel) => ({
  [cancel(actions.DRAGON_MOVE)](store, action) {
    const dragon = store.getState().get("dragon");
    const entity = dragon.get("entity");
    const id = dragon.get("id");

    if (entity === "station" && !!id) {
      store.dispatch(actions.dragonMoveStation(action.x, action.y, id));
      return true;
    }

    return false;
  }
}));
