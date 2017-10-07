export const CREATE_CONNECTION = "CREATE_CONNECTION";
export const UPDATE_CONNECTION = "UPDATE_CONNECTION";

export function createConnection(connection) {
  return {
    type: CREATE_CONNECTION,
    connection
  };
}

export function updateConnection(connection) {
  return {
    type: UPDATE_CONNECTION,
    connection
  };
}
