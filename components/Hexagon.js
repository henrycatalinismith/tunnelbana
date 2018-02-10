const React = require("react");

const cube = require("../geometry/cube").default;

export const Hexagon = ({ r }) => (
  <polygon
    stroke={`black`}
    fill={`white`}
    points={cube.sides({ x: 0, y: 0 }, r || 50)}
  />
);

export default Hexagon;
