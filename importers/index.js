import cities from '../cities';
import importStations from './stations';

export default function importCity(cityName, store) {
  const city = cityName[cityName];
  importStations(city, store);
}
