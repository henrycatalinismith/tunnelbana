import uuid from "uuid/v1";
import actions from "../actions";
import { select } from "../reducers";

export default function(store) {
  return next => action => {
    const ret = next(action);

    switch (action.type) {
      case actions.ARRIVAL:
        const state = store.getState();
        const passengers = select("passengers")
          .from(state)
          .byStationId(action.journey.destinationId);

        if (passengers.size > 0) {
          store.dispatch(
            actions.board(passengers.first().get("id"), action.journey.trainId)
          );
        }
        break;
    }

    return ret;
  };
}
