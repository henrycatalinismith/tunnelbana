const React = require("react");
const PropTypes = require("prop-types");

const cube = require("../geometry/cube").default;

export const Hexagon = ({ x, y, radius, stroke, strokeWidth, fill }) => (
  <polygon
    stroke={stroke}
    strokeWidth={strokeWidth}
    fill={fill}
    points={cube.sides({ x, y }, radius)}
  />
);

Hexagon.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  radius: PropTypes.number,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  fill: PropTypes.string,
};

Hexagon.defaultProps = {
  x: 0,
  y: 0,
  radius: 50,
  stroke: "none",
  strokeWidth: 1,
  fill: "none",
};

export default Hexagon;
