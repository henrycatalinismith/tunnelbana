import { createActions } from "signalbox";

export const actions = createActions(["CREATE_LINE"], types => ({
  createLine: line => ({ type: types.CREATE_LINE, line })
}));
