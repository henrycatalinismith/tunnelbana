import { createActions } from "signalbox";

export const actions = createActions(
  [
    "CREATE_STATION",
    "IMPORT_STATION",
    "DRAG_STATION",
    "DROP_STATION",
    "GRAB_STATION"
  ],
  types => ({
    createStation: station => ({
      type: types.CREATE_STATION,
      station,
      gender: { id: station.genderId }
    }),

    importStation: station => ({
      type: types.IMPORT_STATION,
      station
    }),

    grabStation: id => ({
      type: types.GRAB_STATION,
      station: { id }
    })
  })
);
