export const ADD_TRAIN = 'ADD_TRAIN';
export const DEPARTURE = 'DEPARTURE';
export const ARRIVAL = 'ARRIVAL';

export function addTrain(train) {
  return {
    type: ADD_TRAIN,
    train,
  };
}

export function departure(journey) {
  return {
    type: DEPARTURE,
    journey,
  };
}

export function arrival(journey) {
  return {
    type: ARRIVAL,
    journey,
  };
}
