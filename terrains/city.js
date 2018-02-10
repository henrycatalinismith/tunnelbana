const React = require("react");
const PropTypes = require("prop-types");

const { Hexagon } = require("../components/Hexagon");
const cube = require("../geometry/cube").default;

export const terrain = {
  id: "city",
  color: "#a8a775",
  side: "#8e8d1d",
  height: 10,
}

const buildingRadius = 8;
const building = (x, y, c) => {
  const center = { x, y };
  const points = cube.sides({ x: 0, y: 0 }, buildingRadius + 0);

  const paths = [
    "M" + [points[1][0], points[1][1], 0 + 1, 0 + 1].join(" "),
    "M" + [points[3][0], points[3][1], 0 + 1, 0 + 1].join(" "),
    "M" + [points[5][0], points[5][1], 0 + 1, 0 + 1].join(" "),
  ];

  const translate = `translate(${c.z * 4 * c.x * 4}, ${c.z * 2 * c.y * 3})`;

  return (
    <g transform={translate}>
      <polygon
        key={`${x},${y}`}
        stroke={terrain.color}
        fill={terrain.color}
        points={points}
        stroke="#333"
        strokeWidth="1"
        fill="#999"
      />

      <path
        key={`${x},${y},1`}
        d={paths[0]}
        stroke="#333"
        strokeWidth={1}
      />

      <path
        key={`${x},${y},2`}
        d={paths[1]}
        stroke="#333"
        strokeWidth={1}
      />

      <path
        key={`${x},${y},3`}
        d={paths[2]}
        stroke="#333"
        strokeWidth={1}
      />
    </g>
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
    const hexagons = blocks
      .filter(hex => {
        if (hex.y % 3 !== 0) {
        }
        if (hex.x % 2 !== 0) {
        }
        if (hex.z % 3 !== 0) {
        }
        return true;
      });

    hexagons.sort((a, b) => {
      if (a.z > b.z) return 1;
      if (a.z < b.z) return -1;
      if (a.x > b.x) return -1;
      if (a.x < b.x) return 1;
      return 0;
    });

    const buildings = hexagons.map((hex, i) => {
      const hexPx = cube.pixels(hex, buildingRadius);
      hexPx.y -= terrain.height;
      return building(hexPx.x, hexPx.y, hex);
    });

    return [
      <Hexagon
        key="top"
        y={-terrain.height}
        stroke={terrain.color}
        fill={terrain.color}
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
