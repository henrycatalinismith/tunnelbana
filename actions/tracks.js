export const CREATE_TRACK = "CREATE_TRACK";
export const UPDATE_TRACK = "UPDATE_TRACK";
export const DELETE_TRACK = "DELETE_TRACK";

export function createTrack(track) {
  return {
    type: CREATE_TRACK,
    track
  };
}

export function updateTrack(track) {
  return {
    type: UPDATE_TRACK,
    track
  };
}

export function deleteTrack(id) {
  return {
    type: DELETE_TRACK,
    track: { id }
  };
}
