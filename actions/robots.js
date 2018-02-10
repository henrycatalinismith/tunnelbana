import { createActions } from "signalbox";

export default createActions(["CREATE_ROBOT"], types => ({
  createRobot: ({ robot }) => ({
    type: types.CREATE_ROBOT,
    robot,
  }),
}));



