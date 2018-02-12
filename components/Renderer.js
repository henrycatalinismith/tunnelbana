const React = require("react");
const PropTypes = require("prop-types");

const Canvas = require("./Canvas").default;
const Svg = require("./Svg").default;

const outputMap = {
  canvas: Canvas,
  svg: Svg,
};

class Renderer extends React.PureComponent {
  static propTypes = {
    output: PropTypes.oneOf(["canvas", "svg"]),
    chilren: PropTypes.any,
  };

  static defaultProps = {
    output: "canvas",
  };

  static childContextTypes = {
    renderer: PropTypes.string,
  };

  getChildContext() {
    return { renderer: this.props.output };
  }

  render() {
    const Output = outputMap[this.props.output];
    return (
      <Output>
        {this.props.children}
      </Output>
    );
  }
}

export default Renderer;
