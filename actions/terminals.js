import { createActions } from "signalbox";

export const actions = createActions(
  [
    "CREATE_TERMINAL",
    "DELETE_TERMINAL",
    "UPDATE_TERMINAL",
    "DRAG_TERMINAL",
    "DROP_TERMINAL",
    "GRAB_TERMINAL"
  ],
  types => ({
    createTerminal: terminal => ({
      type: types.CREATE_TERMINAL,
      terminal
    }),

    deleteTerminal: id => ({
      type: types.DELETE_TERMINAL,
      terminal: { id }
    }),

    updateTerminal: terminal => ({
      type: types.UPDATE_TERMINAL,
      terminal
    }),

    dragTerminal: (id, x, y) => ({
      type: types.DRAG_TERMINAL,
      terminal: { id, x, y }
    }),

    dropTerminal: selection => ({
      type: types.DROP_TERMINAL,
      ...selection
    }),

    grabTerminal: selection => ({
      type: types.GRAB_TERMINAL,
      ...selection
    })
  })
);
