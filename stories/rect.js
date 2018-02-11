const React = require("react");
const { storiesOf, action, linkTo } = require("@storybook/react");

const Canvas = require("../components/Canvas").default;
const Rect = require("../components/Rect").default;

storiesOf("Rect", module)

  .add("fill", () => (
    <Canvas>
      <Rect fill="#00ff00" x={50} y={50} width={100} height={100} />
      <Rect fill="#ff00ff" x={200} y={200} width={100} height={100} />
    </Canvas>
  ))

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


