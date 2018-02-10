const React = require("react");
const PropTypes = require("prop-types");

const cube = require("../geometry/cube").default;

export const Cliff = ({ x, y, height, radius, stroke, strokeWidth, fill }) => {
  const allSix = cube.sides({ x, y: y - height }, radius);
  const bottomTwo = allSix
    .slice(2, 5)
    .map(point => [point[0], point[1] + height])
    .concat(allSix.slice(2, 5).reverse());

  return (
    <polygon
      points={bottomTwo}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
    />
  );
};

Cliff.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  height: PropTypes.number,
  radius: PropTypes.number,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  fill: PropTypes.string,
};

Cliff.defaultProps = {
  x: 0,
  y: 0,
  height: 10,
  radius: 50,
  stroke: "none",
  strokeWidth: 1,
  fill: "none",
};

export default Cliff;
