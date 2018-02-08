const React = require("react");
const PropTypes = require("prop-types");
const cube = require("../geometry/cube").default;

export const terrain = {
  id: "city",
  color: "#b3b128",
  side: "#8e8d1d",
  height: 10,
}

const building = (x, y) => (
  <rect
    key={`building(${x}-${y})`}
    x={x}
    y={y}
    width={16}
    height={32}
    stroke="#333"
    strokeWidth="4"
    fill="#999"
  />
);

export class City extends React.PureComponent {
  render() {
    const center = {
      x: 0,
      y: 0 - terrain.height,
    };

    const points = cube.sides(center, 50);

    const walls = points
      .slice(2, 5)
      .map(point => [point[0], point[1] + terrain.height])
      .concat(points.slice(2, 5).reverse());

    return [
      <polygon
        key="top"
        stroke={terrain.color}
        fill={terrain.color}
        points={points}
      />,
      <polygon
        key="sides"
        stroke={terrain.side}
        fill={terrain.side}
        points={walls}
      />,
      building(20, -58),
      building(20, -28),
      building(0, -58),
      building(-20, -58),
    ];
  }
}
