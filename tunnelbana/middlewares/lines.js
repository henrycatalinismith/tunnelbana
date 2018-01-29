import { createMiddleware } from "signalbox";
import uuid from "uuid/v1";
import actions from "../actions";

export const middleware = createMiddleware((cancel, before, after) => ({
  [before(actions.CREATE_LINE)]: function inferLineProperties(store, action) {
    if (!action.line.id) {
      action.line.id = uuid();
    }
  }
}));
