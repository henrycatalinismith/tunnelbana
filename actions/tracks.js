export const ADD_TRACK = "ADD_TRACK";

export function addTrack(track) {
  return {
    type: ADD_TRACK,
    track
  };
}
