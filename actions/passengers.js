export const ADD_PASSENGER = "ADD_PASSENGER";

export function addPassenger(passenger) {
  return {
    type: ADD_PASSENGER,
    passenger
  };
}
