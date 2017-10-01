import { createMiddleware } from "signalbox";
import uuid from "uuid/v1";
import actions from "../actions";

export const middleware = createMiddleware((before, after, cancel) => ({
  [before(actions.ADD_LINE)](store, action) {
    if (!action.line.id) {
      action.line.id = uuid();
    }
  }
}));
