import { createActions } from "signalbox";

export const actions = createActions(["DEPARTURE", "ARRIVAL"], types => ({
  departure: journey => ({ type: types.DEPARTURE, journey }),
  arrival: journey => ({ type: types.ARRIVAL, journey })
}));
