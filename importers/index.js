import cities from "../cities";
import importStations from "./stations";

export default function importCity(cityName, store) {
  const city = cities[cityName];
  importStations(city, store);
}
