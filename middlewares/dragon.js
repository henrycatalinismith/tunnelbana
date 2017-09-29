import uuid from "uuid/v1";
import actions from "../actions";
import { select } from "../reducers";

export function redispatchMoreSpecificMove(store, action) {
  const dragon = store.getState().get("dragon");
  const entity = dragon.get("entity");
  const id = dragon.get("id");

  if (entity === "station" && !!id) {
    store.dispatch(actions.dragonMoveStation(action.x, action.y, id));
    return true;
  }

  return false;
}
