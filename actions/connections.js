export const ADD_CONNECTION = 'ADD_CONNECTION';

export function addConnection(connection) {
  return {
    type: ADD_CONNECTION,
    connection,
  };
}
