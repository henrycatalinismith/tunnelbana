export const ADD_TRAIN = 'ADD_TRAIN';

export function addTrain(train) {
  return {
    type: ADD_TRAIN,
    train,
  };
}
