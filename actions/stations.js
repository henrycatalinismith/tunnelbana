export const CREATE_STATION = "CREATE_STATION";
export const IMPORT_STATION = "IMPORT_STATION";

export const DRAG_STATION = "DRAG_STATION";
export const DROP_STATION = "DROP_STATION";
export const GRAB_STATION = "GRAB_STATION";

export function createStation(station) {
  return {
    type: CREATE_STATION,
    station,
    gender: { id: station.genderId }
  };
}

export function importStation(station) {
  return {
    type: IMPORT_STATION,
    station
  };
}

export function grabStation(id) {
  return {
    type: GRAB_STATION,
    station: { id }
  };
}
