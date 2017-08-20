export const ADD_TRAIN = 'ADD_TRAIN';
export const DEPARTURE = 'DEPARTURE';
export const ARRIVAL = 'ARRIVAL';

export function addTrain(train) {
  return {
    type: ADD_TRAIN,
    train,
  };
}

export function departure(departure) {
  return {
    type: DEPARTURE,
    departure,
  };
}

export function arrival(arrival) {
  return {
    type: ARRIVAL,
    arrival,
  };
}
