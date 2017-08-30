import { Svg, Elements } from 'svgutils';
import actions from '../actions';

export default function importStations(string, store) {
  return new Promise(resolve => {
    Svg.fromXmlString(string, (error, svg) => {
      svg.elements
        .filter(element => element.classes.includes('station'))
        .forEach(group => importStation(group, store));
      resolve();
    });
  });
}

function importStation(group, store) {
  const circle = group.childs
    .filter(child => child instanceof Elements.Circle)
    .shift();

  const action = actions.importStation({
    id: group.id,
    x: circle.cx,
    y: circle.cy,
  });

  store.dispatch(action);
}
