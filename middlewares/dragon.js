import uuid from "uuid/v1";
import actions from "../actions";
import { select } from "../reducers";

export default function(store) {
  return next => action => {
    switch (action.type) {
      case actions.DRAGON_MOVE:
        const dragon = store.getState().get("dragon");
        const entity = dragon.get("entity");
        const id = dragon.get("id");
        if (entity && id) {
          action.entity = entity;
          action.id = id;
        }
        break;
    }

    return next(action);
  };
}
