const React = require("react");
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

storiesOf("Body", module)

  .add("all", withPropsCombinations(Wrapper, {
    width: [200],
    height: [200],
    frame: ["-x", "-y"],
  }))

  .add("-x", () => <Wrapper frame="-x" width="300" height="300" />)
  .add("-y", () => <Wrapper frame="-y" width="300" height="300" />)
