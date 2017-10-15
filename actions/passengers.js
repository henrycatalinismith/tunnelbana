import { createActions } from "signalbox";

export const actions = createActions(
  ["CREATE_PASSENGER", "ALIGHT", "BOARD", "LIVE_HAPPILY_EVER_AFTER"],
  types => ({
    createPassenger: ({ passengerId, genderId, stationId }) => ({
      type: types.CREATE_PASSENGER,
      passenger: { id: passengerId },
      gender: { id: genderId },
      station: { id: stationId }
    }),

    alight: ({ passengerId, stationId }) => ({
      type: types.ALIGHT,
      passenger: { id: passengerId },
      station: { id: stationId }
    }),

    board: ({ passengerId, trainId }) => ({
      type: types.BOARD,
      passenger: { id: passengerId },
      train: { id: trainId }
    }),

    liveHappilyEverAfter: ({ passengerId }) => ({
      type: types.LIVE_HAPPILY_EVER_AFTER,
      passenger: { id: passengerId }
    })
  })
);
