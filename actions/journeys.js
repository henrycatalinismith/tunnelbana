import { createActions } from "signalbox";

export default createActions(["DEPARTURE", "ARRIVAL"], types => ({
  departure: ({ journey, train, source, destination, connection }) => ({
    type: types.DEPARTURE,
    journey,
    train,
    source,
    destination,
    connection,
  }),

  arrival: ({ journey, train, source, destination, connection }) => ({
    type: types.ARRIVAL,
    journey,
    train,
    source,
    destination,
    connection,
  }),
}));



