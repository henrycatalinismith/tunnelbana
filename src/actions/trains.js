export const ADD_TRAIN = 'ADD_TRAIN';
export const DEPART = 'DEPART';

export function addTrain(train) {
  return {
    type: ADD_TRAIN,
    train,
  };
}

export function depart(departure) {
  return {
    type: DEPART,
    departure,
  };
}
