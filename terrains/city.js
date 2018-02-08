const React = require("react");
const PropTypes = require("prop-types");
const cube = require("../geometry/cube").default;

export const terrain = {
  id: "city",
  color: "#a8a775",
  side: "#8e8d1d",
  height: 10,
}

const buildingRadius = 8;
const building = (x, y) => {
  const center = { x, y };
  const points = cube.sides(center, buildingRadius);
  return (
    <polygon
      key={`${x},${y}`}
      stroke={terrain.color}
      fill={terrain.color}
      points={points}
      stroke="#333"
      strokeWidth="1"
      fill="#999"
    />
  );
}

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

    const blocks = cube.radius(cube(), 2);
    const buildings = blocks
      .filter(hex => {
        if (hex.x % 2 !== 0) {
          return false;
        }
        if (hex.z % 2 !== 0) {
          return false;
        }
        return true;
      })
      .map((hex, i) => {
        const hexPx = cube.pixels(hex, buildingRadius + 2);
        hexPx.y -= terrain.height;
        return building(hexPx.x, hexPx.y);
      });
    console.log(cube.radius(cube(), 1));

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
      ...buildings
    ];
  }
}
