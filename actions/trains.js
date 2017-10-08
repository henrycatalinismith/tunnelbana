export const CREATE_TRAIN = "CREATE_TRAIN";

export function createTrain(train) {
  return {
    type: CREATE_TRAIN,
    train
  };
}
