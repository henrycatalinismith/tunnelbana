import { createActions } from "signalbox";

export const actions = createActions(
  ["START", "PAUSE", "RESUME", "SAVE"],
  types => ({
    start: () => ({ type: types.START }),
    pause: () => ({ type: types.PAUSE }),
    resume: () => ({ type: types.RESUME }),
    save: () => ({ type: types.SAVE })
  })
);
