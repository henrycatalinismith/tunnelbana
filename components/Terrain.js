const React = require("react");
const PropTypes = require("prop-types");

const Hexagon = require("./Hexagon").default;
const Cliff = require("./Cliff").default;
const cube = require("../geometry/cube").default;

export const Terrain = ({ height, color, cliff, x, y, radius, stroke, strokeWidth }) => ([
  <Hexagon
    key="top"
    x={x}
    y={y}
    radius={radius}
    fill={color}
  />,
 <Cliff
    key="top"
    x={x}
    y={y}
    height={height}
    radius={radius}
    fill={cliff}
  />
]);

Terrain.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  color: PropTypes.string,
  height: PropTypes.number,
  radius: PropTypes.number,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
};

Terrain.defaultProps = {
  x: 0,
  y: 0,
  height: 10,
  radius: 50,
  stroke: "none",
  strokeWidth: 1,
  fill: "none",
};

export default Terrain;
