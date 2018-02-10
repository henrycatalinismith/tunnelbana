const React = require("react");
const { storiesOf, action, linkTo } = require("@storybook/react");

const cube = require("../geometry/cube").default;
const { Hexagon } = require("../components/Hexagon");
const { Cube } = require("../components/Cube");

storiesOf("Cube", module)

  .add("center", () => (
    <svg viewBox="-200 -200 1000 1000" width="100%" height="100%">
      <Cube x={0} y={0} z={0}><Hexagon stroke="black" /></Cube>
    </svg>
  ))

  .add("radius", () => (
    <svg viewBox="-300 -300 1000 1000" width="100%" height="100%">
      {cube.radius(cube(), 2).map(({ x, y, z}) => (
        <Cube x={x} y={y} z={z}><Hexagon stroke="black" /></Cube>
      ))}
    </svg>
  ))

  .add("ring", () => (
    <svg viewBox="-300 -300 1000 1000" width="100%" height="100%">
      {cube.ring(cube(), 2).map(({ x, y, z}) => (
        <Cube x={x} y={y} z={z}><Hexagon stroke="black" /></Cube>
      ))}
    </svg>
  ))


