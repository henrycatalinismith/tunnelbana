const React = require("react");
const PropTypes = require("prop-types");
const { storiesOf, action, linkTo } = require("@storybook/react");
//const { action } = require("@storybook/addon-actions");
const withPropsCombinations = require("react-storybook-addon-props-combinations").default;

const Terrain = require("../terrains").default;
const { Body } = require("../components/Body");

const Wrapper = ({ frame, width, height }) => (
  <svg viewBox="-50 -70 100 120" style={{ height: `${height}px`, width: `${width}px`, float: "left" }}>
    <Terrain id="grass" />
    <Body frame={frame} />
  </svg>
)

class Animation extends React.PureComponent {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    frames: PropTypes.array,
  };

  constructor(...props) {
    super(...props);
    this.state = {
      frame: 0,
    };
  }

  componentDidMount() {
    this.interval = window.setInterval(() => {
      const isLastFrame = this.state.frame === this.props.frames.length - 1;
      const nextFrame = isLastFrame ? 0 : this.state.frame + 1;
      this.setState({ frame: nextFrame });
    }, 200);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    const { width, height, frames } = this.props;
    const { frame } = this.state;
    return (
      <svg viewBox="-50 -70 100 120" style={{ height: `${height}px`, width: `${width}px`, float: "left" }}>
        <Terrain id="grass" />
        <Body frame={frames[frame]} />
      </svg>
    );
  }
}

storiesOf("Body", module)

  .add("all", withPropsCombinations(Wrapper, {
    width: [200],
    height: [200],
    frame: [
      "minus-x-1",
      "minus-x-2",
      "minus-y-1",
      "minus-y-2",
    ],
  }))

  .add("minus-x-1", () => <Wrapper frame="minus-x-1" width="300" height="300" />)
  .add("minus-x-2", () => <Wrapper frame="minus-x-2" width="300" height="300" />)
  .add("minus-x-cycle", () => (<Animation width={300} height={300} frames={[
    "minus-x-1",
    "minus-x-2"
  ]} /> ))

  .add("minus-y-1", () => <Wrapper frame="minus-y-1" width="300" height="300" />)
  .add("minus-y-2", () => <Wrapper frame="minus-y-2" width="300" height="300" />)
  .add("minus-y-cycle", () => (<Animation width={300} height={300} frames={[
    "minus-y-1",
    "minus-y-2"
  ]} /> ))
