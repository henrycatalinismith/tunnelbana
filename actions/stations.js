export const CREATE_STATION = "CREATE_STATION";
export const IMPORT_STATION = "IMPORT_STATION";

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
