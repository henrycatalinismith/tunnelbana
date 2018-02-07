import { createActions } from "signalbox";

export default createActions(["CREATE_TRAIN"], types => ({
  createTrain: ({ train, hexagon, cell, terrain, station }) => ({
    type: types.CREATE_TRAIN,
    train,
    hexagon,
    cell,
    terrain,
    station,
  }),
}));



