const React = require("react");
const PropTypes = require("prop-types");
const cube = require("../geometry/cube").default;

export const terrain = {
  id: "water",
  color: "#2369a6",
  side: "#174d7c",
  height: 2,
}

export class Water extends React.PureComponent {
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
      />
    ];
  }
}
