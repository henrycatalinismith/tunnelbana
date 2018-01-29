import actions from "../actions";

export default function importStations(string, store) {
  const parser = new DOMParser();
  const svg = parser.parseFromString(string, "image/svg+xml");

  const stations = Array.prototype.slice.call(svg.querySelectorAll(".station"));
  console.log(string, stations);
  stations.forEach(element => importStation(element, store));
}

function importStation(group, store) {
  const circle = group.querySelector("circle");

  const action = actions.importStation({
    id: group.getAttribute("id"),
    x: circle.getAttribute("cx"),
    y: circle.getAttribute("cy")
  });

  store.dispatch(action);
}
