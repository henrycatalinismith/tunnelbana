export const ADD_STATION = "ADD_STATION";
export const IMPORT_STATION = "IMPORT_STATION";
export const MOVE_STATION = "MOVE_STATION";
export const SELECT_STATION = "SELECT_STATION";
export const DESELECT_STATION = "DESELECT_STATION";

export function addStation(station) {
  return {
    type: ADD_STATION,
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

export function selectStation(id) {
  return {
    type: SELECT_STATION,
    id
  };
}

export function deselectStation(id) {
  return {
    type: DESELECT_STATION,
    id
  };
}
