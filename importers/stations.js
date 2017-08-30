import { Svg } from 'svgutils';

export default function importStations(string, store) {
  Svg.fromXmlString(string, (error, svg) => {
    console.log(svg);
  });
}
