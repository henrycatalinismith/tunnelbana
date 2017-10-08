export const DEPARTURE = "DEPARTURE";
export const ARRIVAL = "ARRIVAL";

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
