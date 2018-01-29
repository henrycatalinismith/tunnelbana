import { createMiddleware } from "signalbox";
import uuid from "uuid/v1";
import actions from "../actions";

export const middleware = createMiddleware((cancel, before, after) => ({
  [before(actions.CREATE_TRAIN)]: function inferTrainProperties(store, action) {
    if (!action.train.id) {
      action.train.id = uuid();
    }
  }
}));
