import { createActions } from "signalbox";

export default createActions(["CREATE_CONNECTION"], types => ({
  createConnection: ({ connection, tracks }) => ({
    type: types.CREATE_CONNECTION,
    connection,
    tracks,
  }),
}));



