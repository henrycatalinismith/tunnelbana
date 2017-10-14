export const CREATE_PASSENGER = "CREATE_PASSENGER";
export const ALIGHT = "ALIGHT";
export const BOARD = "BOARD";
export const LIVE_HAPPILY_EVER_AFTER = "LIVE_HAPPILY_EVER_AFTER;";

export function createPassenger({ genderId, passengerId, stationId }) {
  return {
    type: CREATE_PASSENGER,
    passenger: { id: passengerId },
    gender: { id: genderId },
    station: { id: stationId }
  };
}

export function alight({ passengerId, stationId }) {
  return {
    type: ALIGHT,
    passenger: { id: passengerId },
    station: { id: stationId }
  };
}

export function board({ passengerId, trainId }) {
  return {
    type: BOARD,
    passenger: { id: passengerId },
    train: { id: trainId }
  };
}

export function liveHappilyEverAfter({ passengerId }) {
  return {
    type: LIVE_HAPPILY_EVER_AFTER,
    passenger: { id: passengerId }
  };
}
