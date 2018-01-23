import { createActions } from "signalbox";

export default createActions(["CREATE_ACTOR"], types => ({
  createActor: ({ x, y }) => ({
    type: types.CREATE_ACTOR,
    actor: { x, y }
  })
}));



