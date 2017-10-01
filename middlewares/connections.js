import { createMiddleware } from "signalbox";
import uuid from "uuid/v1";
import actions from "../actions";

export const middleware = createMiddleware((before, after, cancel) => ({
  [before(actions.ADD_CONNECTION)](store, action) {
    if (!action.connection.id) {
      action.connection.id = uuid();
    }
  }
}));
