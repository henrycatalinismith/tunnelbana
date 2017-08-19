export const ADD_CONNECTION = 'ADD_CONNECTION';

export function addConnection(source, destination) {
  return {
    type: ADD_CONNECTION,
    source,
    destination,
  };
}
