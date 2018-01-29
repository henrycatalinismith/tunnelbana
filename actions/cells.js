import { createActions } from "signalbox";

export default createActions(["CREATE_CELL"], types => ({
  createCell: ({ radius }) => ({
    type: types.CREATE_CELL,
    cell: { radius }
  }),
}));



