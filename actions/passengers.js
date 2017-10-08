export const CREATE_PASSENGER = "CREATE_PASSENGER";
export const ALIGHT = "ALIGHT";
export const BOARD = "BOARD";

export function addPassenger(passenger) {
  return {
    type: CREATE_PASSENGER,
    passenger
  };
}

export function alight(id, stationId) {
  return {
    type: ALIGHT,
    passenger: { id, stationId }
  };
}

export function board(id, trainId) {
  return {
    type: BOARD,
    passenger: { id, trainId }
  };
}
