const React = require("react");
const PropTypes = require("prop-types");
const { storiesOf, action, linkTo } = require("@storybook/react");
const { TweenLite, TweenMax, Linear } = require("gsap");
const withPropsCombinations = require("react-storybook-addon-props-combinations").default;

const cube = require("../geometry/cube").default;
const Svg = require("../components/Svg").default;
const Story = require("./Story").default;
const Terrain = require("../components/Terrain").default;
const Robot = require("../components/Robot").default;
const Cube = require("../components/Cube").default;
const Hexagon = require("../components/Hexagon").default;

const Wrapper = ({ frame, width, height }) => (
  <div style={{ height: `${height}px`, width: `${width}px`, float: "left" }}>
    <Svg x={0} y={0} width={100} height={120}>
      <Terrain id="grass" />
      <Robot frame={frame} />
    </Svg>
  </div>
)

class Loop extends React.PureComponent {
  static propTypes = {
    interval: PropTypes.number,
  };

  static defaultProps = {
    interval: 1000,
  };

  constructor(...props) {
    super(...props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    const loop = () => {
      this.setState({ count: this.state.count + 1 });
      const from = { x: -20, y: -60 };
      const to = cube.pixels({ x: from.x -1, y: 0, z: 1}, 50);
      to.x += from.x;
      to.y += from.y;
      TweenLite.fromTo(`.Robot`, this.props.interval / 1000, from, {
        ...to,
        ease: Linear.easeNone,
      });
    };
    this.interval = window.setInterval(loop, this.props.interval + 400);
    loop();
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return this.props.children;
  }
}

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
      <Robot frame={frames[frame]} />
    );
  }
}

storiesOf("Robot", module)

  .add("snowflake", () => {

    return (
      <Story>

        {cube.radius(cube(), 2).map(({ x, y, z}, i) => (
          i % 2 === 0 &&
          <Cube key={i} x={x} y={y} z={z}><Terrain id="water" /></Cube>
        ))}

        <Cube x={0} y={2} z={-2}><Terrain id="grass" /></Cube>
        <Cube x={0} y={1} z={-1}><Terrain id="grass" /></Cube>

        <Cube x={2} y={0} z={-2}><Terrain id="grass" /></Cube>
        <Cube x={1} y={0} z={-1}><Terrain id="grass" /></Cube>

        <Cube x={-2} y={2} z={0}><Terrain id="grass" /></Cube>
        <Cube x={-1} y={1} z={0}><Terrain id="grass" /></Cube>

        <Cube x={2} y={-2} z={0}><Terrain id="grass" /></Cube>
        <Cube x={1} y={-1} z={0}><Terrain id="grass" /></Cube>

        <Cube x={0} y={0} z={0}><Terrain id="grass" /></Cube>
        <Cube x={-1} y={0} z={1}><Terrain id="grass" />
          <Animation width={300} height={300} frames={[
            "minus-x-1",
            "minus-x-2"
          ]} />
        </Cube>
        <Cube x={-2} y={0} z={2}><Terrain id="grass" />
          <Animation width={300} height={300} frames={[
            "minus-x-2",
            "minus-x-1"
          ]} />
        </Cube>

        <Cube x={0} y={-1} z={1}><Terrain id="grass" /><Robot frame="minus-y-1" /></Cube>
        <Cube x={0} y={-2} z={2}><Terrain id="grass" /><Robot frame="minus-y-2" /></Cube>

      </Story>
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

  .add("minus-x-1", () => (
    <Story scale={4}>
      <Terrain id="grass" />
      <Robot frame="minus-x-1" />
    </Story>
  ))

  .add("minus-x-2", () => (
    <Story scale={4}>
      <Terrain id="grass" />
      <Robot frame="minus-x-2" />
    </Story>
  ))

  .add("minus-x-cycle", () => (
    <Story scale={4}>
      <Terrain id="grass" />
      <Animation width={300} height={300} frames={[
        "minus-x-1",
        "minus-x-2"
      ]} />
    </Story>
  ))

  .add("minus-x-animation", () => (
    <Story scale={2}>
      <Cube x={-1} y={0} z={1}>
        <Terrain id="grass" />
      </Cube>
      <Cube x={0} y={0} z={0}>
        <Terrain id="grass" />
        <Loop interval={860}>
          <Animation width={300} height={300} frames={[
            "minus-x-1",
            "minus-x-2"
          ]} />
        </Loop>
      </Cube>
    </Story>
  ))

  .add("minus-y-1", () => (
    <Story scale={4}>
      <Terrain id="grass" />
      <Robot frame="minus-y-1" />
    </Story>
  ))

  .add("minus-y-2", () => (
    <Story scale={4}>
      <Terrain id="grass" />
      <Robot frame="minus-y-2" />
    </Story>
  ))

  .add("minus-y-cycle", () => (
    <Story scale={4}>
      <Terrain id="grass" />
      <Animation width={300} height={300} frames={[
        "minus-y-1",
        "minus-y-2"
      ]} />
    </Story>
  ))
