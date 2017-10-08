export const START = "START";
export const PAUSE = "PAUSE";
export const RESUME = "RESUME";

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
