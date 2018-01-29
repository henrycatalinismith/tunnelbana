import { createActions } from "signalbox";

export const actions = createActions(["CREATE_TRAIN"], types => ({
  createTrain: train => ({ type: types.CREATE_TRAIN, train })
}));
