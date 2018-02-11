const React = require("react");
const { storiesOf, action, linkTo } = require("@storybook/react");

const Canvas = require("../components/Canvas").default;
const Circle = require("../components/Circle").default;

storiesOf("Circle", module)

  .add("fill", () => (
    <Canvas>
      <Circle fill="#00ff00" cx={100} cy={100} r={50} />
      <Circle fill="#ff00ff" cx={250} cy={250} r={50} />
    </Canvas>
  ))

  .add("stroke", () => (
    <Canvas>
      <Circle stroke="blue" cx={100} cy={100} r={50} />
      <Circle stroke="green" cx={250} cy={250} r={50} />
    </Canvas>
  ))

  .add("strokeWidth", () => (
    <Canvas>
      <Circle stroke="blue" strokeWidth={20} cx={100} cy={100} r={50} />
      <Circle stroke="green" strokeWidth={20} cx={250} cy={250} r={50} />
    </Canvas>
  ))


