export const CREATE_PASSENGER = "CREATE_PASSENGER";
export const ALIGHT = "ALIGHT";
export const BOARD = "BOARD";

export function createPassenger({ passengerId, genderId, stationId }) {
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
