const React = require("react");
const PropTypes = require("prop-types");
const { storiesOf, action, linkTo } = require("@storybook/react");
//const { action } = require("@storybook/addon-actions");
const withPropsCombinations = require("react-storybook-addon-props-combinations").default;

const cube = require("../geometry/cube").default;
const Terrain = require("../components/Terrain").default;
const Robot = require("../components/Robot").default;
const Cube = require("../components/Cube").default;
const Hexagon = require("../components/Hexagon").default;

const Wrapper = ({ frame, width, height }) => (
  <svg viewBox="-50 -70 100 120" style={{ height: `${height}px`, width: `${width}px`, float: "left" }}>
    <Terrain id="grass" />
    <Robot frame={frame} />
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
        <Robot frame={frames[frame]} />
      </svg>
    );
  }
}

storiesOf("Robot", module)

  .add("snowflake", () => {

    return (
      <svg viewBox="-250 -250 1000 1000" width="100%" height="100%">

        <Cube x={0} y={2} z={-2}><Terrain id="grass" /></Cube>
        <Cube x={0} y={1} z={-1}><Terrain id="grass" /></Cube>

        <Cube x={2} y={0} z={-2}><Terrain id="grass" /></Cube>
        <Cube x={1} y={0} z={-1}><Terrain id="grass" /></Cube>

        <Cube x={-2} y={2} z={0}><Terrain id="grass" /></Cube>
        <Cube x={-1} y={1} z={0}><Terrain id="grass" /></Cube>

        <Cube x={2} y={-2} z={0}><Terrain id="grass" /></Cube>
        <Cube x={1} y={-1} z={0}><Terrain id="grass" /></Cube>

        <Cube x={0} y={-1} z={1}><Terrain id="grass" /><Robot frame="minus-x-1" /></Cube>
        <Cube x={0} y={-2} z={2}><Terrain id="grass" /><Robot frame="minus-x-2" /></Cube>

        <Cube x={-1} y={0} z={1}><Terrain id="grass" /><Robot frame="minus-y-1" /></Cube>
        <Cube x={-2} y={0} z={2}><Terrain id="grass" /><Robot frame="minus-y-2" /></Cube>

      </svg>
    );
  })

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
