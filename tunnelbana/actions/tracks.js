import { createActions } from "signalbox";

export const actions = createActions(
  ["CREATE_TRACK", "UPDATE_TRACK", "DELETE_TRACK"],
  types => ({
    createTrack: track => ({
      type: types.CREATE_TRACK,
      track
    }),

    updateTrack: track => ({
      type: types.UPDATE_TRACK,
      track
    }),

    deleteTrack: id => ({
      type: types.DELETE_TRACK,
      track: { id }
    })
  })
);
