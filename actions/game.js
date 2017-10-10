export const START = "START";
export const PAUSE = "PAUSE";
export const RESUME = "RESUME";
export const SAVE = "SAVE";

export function start() {
  return {
    type: START
  };
}

export function pause() {
  return {
    type: PAUSE
  };
}

export function resume() {
  return {
    type: RESUME
  };
}

export function save() {
  return {
    type: SAVE
  };
}
