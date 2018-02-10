const React = require("react");
const PropTypes = require("prop-types");

const cube = require("../geometry/cube").default;

export class Cube extends React.PureComponent {
  static propTypes = {
    x: PropTypes.number,
    children: PropTypes.any,
  };

  static defaultProps = { r: 50 };

  render() {
    const { r } = this.props;
    const center = cube.pixels(this.props, r);
    const points = cube.sides({ x: 0, y: 0 }, r);
    const offset = `translate(${Math.round(center.x)}, ${Math.round(center.y)})`;
    return (
      <g transform={offset}>
        {this.props.children}
      </g>
    );
  }
}

export default Cube;
