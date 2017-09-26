export const ADD_PASSENGER = "ADD_PASSENGER";
export const ALIGHT = "ALIGHT";
export const BOARD = "BOARD";

export function addPassenger(passenger) {
  return {
    type: ADD_PASSENGER,
    passenger
  };
}

export function alight(passengerId, trainId) {
  return {
    type: ALIGHT,
    passengerId
  };
}

export function board(passengerId, trainId) {
  return {
    type: BOARD,
    passengerId,
    trainId
  };
}
