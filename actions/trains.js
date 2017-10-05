export const CREATE_TRAIN = "CREATE_TRAIN";
export const DEPARTURE = "DEPARTURE";
export const ARRIVAL = "ARRIVAL";

export function createTrain(train) {
  return {
    type: CREATE_TRAIN,
    train
  };
}

export function departure(journey) {
  return {
    type: DEPARTURE,
    journey
  };
}

export function arrival(journey) {
  return {
    type: ARRIVAL,
    journey
  };
}
