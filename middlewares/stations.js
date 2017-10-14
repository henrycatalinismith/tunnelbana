import { createMiddleware } from "signalbox";
import uuid from "uuid/v1";
import actions from "../actions";

export const middleware = createMiddleware((before, after, cancel) => ({
  [before(actions.CREATE_STATION)]: function inferStationProperties(
    store,
    action
  ) {
    if (!action.station.id) {
      action.station.id = uuid();
    }

    if (!action.gender.id) {
      action.gender.id = "circle";
    }
  }
}));
