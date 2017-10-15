import { createActions } from "signalbox";

export const actions = createActions(
  [
    "CREATE_CONNECTION",
    "IMAGINE_CONNECTION",
    "REALIZE_CONNECTION",
    "ABANDON_CONNECTION"
  ],
  types => ({
    createConnection: ({ connectionId, lineId, sourceId, destinationId }) => {
      return {
        type: types.CREATE_CONNECTION,
        connection: { id: connectionId },
        line: { id: lineId },
        source: { id: sourceId },
        destination: { id: destinationId }
      };
    },

    imagineConnection: ({ connectionId, lineId, sourceId, terminalId }) => {
      return {
        type: types.IMAGINE_CONNECTION,
        connection: { id: connectionId },
        line: { id: lineId },
        source: { id: sourceId },
        terminal: { id: terminalId }
      };
    },

    realizeConnection: ({ destinationId }) => {
      return {
        type: types.REALIZE_CONNECTION,
        destination: { id: destinationId }
      };
    },

    abandonConnection: () => {
      return {
        type: types.ABANDON_CONNECTION
      };
    }
  })
);
