const React = require("react");
const { storiesOf, action, linkTo } = require("@storybook/react");

const cube = require("../geometry/cube").default;
const Story = require("./Story").default;
const Hexagon = require("../components/Hexagon").default;
const Cube = require("../components/Cube").default;

const Hex = ({ x, y, z, ...props }) => (
  <Cube key={[x, y, z].join(",")} x={x} y={y} z={z}>
    <Hexagon fill="#f4f4f1" stroke="#999" {...props} />
    <text key="x" fontFamily="sans-serif" fill="#59b30c" x={24} y={-16}>{x}</text>,
    <text key="y" fontFamily="sans-serif" fill="#e85ee6" x={-28} y={-16}>{y}</text>,
    <text key="z" fontFamily="sans-serif" fill="#3199e7" x={-4} y={40}>{z}</text>,
  </Cube>
);

storiesOf("Cube", module)

  .add("center", () => (
    <Story>
      <Hex x={0} y={0} z={0} />
    </Story>
  ))

  .add("line", () => (
    <Story>
      {cube.radius(cube(), 2).map(({ x, y, z}, i) => (
        <Hex key={i} x={x} y={y} z={z} />
      ))}
      {cube.line(cube(-2, 1, -1), cube(2, 0, -2)).map(({ x, y, z}, i) => (
        <Hex key={i} x={x} y={y} z={z} fill="#e2e7eb" />
      ))}


    </Story>
  ))

  .add("neigbors", () => (
    <Story>
      {cube.radius(cube(), 2).map(({ x, y, z}, i) => (
        <Hex key={i} x={x} y={y} z={z} />
      ))}
      <Cube x={0} y={1} z={-1}><Hexagon fill="red" /></Cube>
      <Hex x={0} y={1} z={-1} fill="#c2d7d0" />
      {cube.neighbors(cube(0, 1, -1)).map(({ x, y, z}, i) => (
        <Hex key={i} x={x} y={y} z={z} fill="#e2e7eb" />
      ))}
    </Story>
  ))

  .add("radius", () => (
    <Story>
      {cube.radius(cube(), 2).map(({ x, y, z}, i) => (
        <Hex key={i} x={x} y={y} z={z} />
      ))}
    </Story>
  ))

  .add("ring", () => (
    <Story>
      {cube.ring(cube(), 2).map(({ x, y, z}, i) => (
        <Hex key={i} x={x} y={y} z={z} />
      ))}
    </Story>
  ))
