export const CREATE_CONNECTION = "CREATE_CONNECTION";
export const IMAGINE_CONNECTION = "IMAGINE_CONNECTION";
export const REALIZE_CONNECTION = "REALIZE_CONNECTION";
export const ABANDON_CONNECTION = "ABANDON_CONNECTION";

export function createConnection({
  connectionId,
  lineId,
  sourceId,
  destinationId
}) {
  return {
    type: CREATE_CONNECTION,
    connection: { id: connectionId },
    line: { id: lineId },
    source: { id: sourceId },
    destination: { id: destinationId }
  };
}

export function imagineConnection({
  connectionId,
  lineId,
  sourceId,
  terminalId
}) {
  return {
    type: IMAGINE_CONNECTION,
    connection: { id: connectionId },
    line: { id: lineId },
    source: { id: sourceId },
    terminal: { id: terminalId }
  };
}

export function realizeConnection({ destinationId }) {
  return {
    type: REALIZE_CONNECTION,
    destination: { id: destinationId }
  };
}

export function abandonConnection() {
  return {
    type: ABANDON_CONNECTION
  };
}
