const React = require("react");
const PropTypes = require("prop-types");
const { storiesOf, action, linkTo } = require("@storybook/react");

const Canvas = require("../components/Canvas").default;
const Svg = require("../components/Svg").default;
const Rect = require("../components/Rect").default;
const Renderer = require("../components/Renderer").default;

class OutputSwitch extends React.PureComponent {
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
    const canvasStyle = this.state.output === "canvas" ? OutputSwitch.buttonOn : OutputSwitch.buttonOff;
    const svgStyle = this.state.output === "svg" ? OutputSwitch.buttonOn : OutputSwitch.buttonOff;
    console.log(this.props.children);

    return (
      <div>
        <div style={OutputSwitch.div}>
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

storiesOf("Rect", module)
  .addDecorator(Story => <OutputSwitch><Story /></OutputSwitch>)

  .add("fill", () => [
    <Rect key={1} fill="#00ff00" x={50} y={50} width={100} height={100} />,
    <Rect key={2} fill="#ff00ff" x={200} y={200} width={100} height={100} />,
  ])

  .add("stroke", () => (
    <Canvas>
      <Rect stroke="blue" x={50} y={50} width={100} height={100} />
      <Rect stroke="green" x={200} y={200} width={100} height={100} />
    </Canvas>
  ))

  .add("strokeWidth", () => (
    <Canvas>
      <Rect stroke="blue" strokeWidth={20} x={50} y={50} width={100} height={100} />
      <Rect stroke="green" strokeWidth={20} x={200} y={200} width={100} height={100} />
    </Canvas>
  ))


