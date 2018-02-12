const React = require("react");
const PropTypes = require("prop-types");

const Svg = ({ x, y, width, height, children }) => (
  <svg viewBox={[x, y, width, height].join(" ")}>
    {children}
  </svg>
);

Svg.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  children: PropTypes.any,
};

Svg.defaultProps = {
  x: 0,
  y: 0,
  width: window.innerWidth,
  height: window.innerHeight,
  children: null,
};

export default Svg;
