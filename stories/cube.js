const React = require("react");
const { storiesOf, action, linkTo } = require("@storybook/react");

const cube = require("../geometry/cube").default;
const Story = require("./Story").default;
const Hexagon = require("../components/Hexagon").default;
const Cube = require("../components/Cube").default;

storiesOf("Cube", module)

  .add("center", () => (
    <Story>
      <Cube x={0} y={0} z={0}><Hexagon stroke="black" /></Cube>
    </Story>
  ))

  .add("line", () => (
    <Story>
      {cube.radius(cube(), 2).map(({ x, y, z}, i) => (
        <Cube key={i} x={x} y={y} z={z}><Hexagon stroke="black" /></Cube>
      ))}
      {cube.line(cube(-2, 0, 2), cube(2, 0, -2)).map(({ x, y, z}, i) => (
        <Cube key={i} x={x} y={y} z={z}><Hexagon fill="black" /></Cube>
      ))}
    </Story>
  ))

  .add("neigbors", () => (
    <Story>
      {cube.radius(cube(), 2).map(({ x, y, z}, i) => (
        <Cube key={i} x={x} y={y} z={z}><Hexagon stroke="black" /></Cube>
      ))}
      <Cube x={0} y={1} z={-1}><Hexagon fill="red" /></Cube>
      {cube.neighbors(cube(0, 1, -1)).map(({ x, y, z}, i) => (
        <Cube key={i} x={x} y={y} z={z}><Hexagon fill="blue" /></Cube>
      ))}
    </Story>
  ))

  .add("radius", () => (
    <Story>
      {cube.radius(cube(), 2).map(({ x, y, z}, i) => (
        <Cube key={i} x={x} y={y} z={z}><Hexagon stroke="black" /></Cube>
      ))}
    </Story>
  ))

  .add("ring", () => (
    <Story>
      {cube.ring(cube(), 2).map(({ x, y, z}, i) => (
        <Cube key={i} x={x} y={y} z={z}><Hexagon stroke="black" /></Cube>
      ))}
    </Story>
  ))
