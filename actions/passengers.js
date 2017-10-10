export const CREATE_PASSENGER = "CREATE_PASSENGER";
export const ALIGHT = "ALIGHT";
export const BOARD = "BOARD";

export function createPassenger(passenger) {
  return {
    type: CREATE_PASSENGER,
    passenger
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
