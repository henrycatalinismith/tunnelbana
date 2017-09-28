import uuid from "uuid/v1";
import actions from "../actions";
import { select } from "../reducers";

export function injectEntity(store, action) {
  const dragon = store.getState().get("dragon");
  const entity = dragon.get("entity");
  const id = dragon.get("id");
  if (entity && id) {
    action.entity = entity;
    action.id = id;
  }
}
