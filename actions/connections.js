export const CREATE_CONNECTION = "CREATE_CONNECTION";

export function createConnection(connection) {
  return {
    type: CREATE_CONNECTION,
    connection
  };
}
