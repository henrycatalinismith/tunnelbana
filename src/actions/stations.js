export const ADD_STATION = 'ADD_STATION';

export function addStation(station) {
  return {
    type: ADD_STATION,
    station,
  };
}
