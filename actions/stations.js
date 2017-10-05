export const CREATE_STATION = "CREATE_STATION";
export const IMPORT_STATION = "IMPORT_STATION";
export const MOVE_STATION = "MOVE_STATION";

export function createStation(station) {
  return {
    type: CREATE_STATION,
    station
  };
}

export function importStation(station) {
  return {
    type: IMPORT_STATION,
    station
  };
}

export function moveStation(stationId, x, y) {
  return {
    type: MOVE_STATION,
    stationId,
    x,
    y
  };
}
