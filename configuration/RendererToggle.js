const React = require("react");
const PropTypes = require("prop-types");

const Renderer = require("../components/Renderer").default;

class RendererToggle extends React.PureComponent {
  static propTypes = {
    children: PropTypes.any
  };

  static div = {
    position: "absolute",
    top: "0rem",
    top: "0.5rem",
    right: "0.5rem",
  };

  static buttonOn = {
    border: "2px solid #777",
    fontSize: "14px",
  };

  static buttonOff = {
    background: "#777",
    fontSize: "14px",
    color: "#eee",
  };

  constructor(...props) {
    super(...props);
    this.state = { output: "canvas" };
  }

  canvas = () => this.setState({ output: "canvas" });
  svg = () => this.setState({ output: "svg" });

  render() {
    const canvasStyle = this.state.output === "canvas" ? RendererToggle.buttonOn : RendererToggle.buttonOff;
    const svgStyle = this.state.output === "svg" ? RendererToggle.buttonOn : RendererToggle.buttonOff;

    return (
      <div>
        <div style={RendererToggle.div}>
          <button onClick={this.canvas} style={canvasStyle}>Canvas</button>
          <button onClick={this.svg} style={svgStyle}>SVG</button>
        </div>
        <Renderer output={this.state.output}>
          {this.props.children}
        </Renderer>
      </div>
    );
  }
}

export default RendererToggle;
