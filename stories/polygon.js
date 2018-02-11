const React = require("react");
const { storiesOf, action, linkTo } = require("@storybook/react");

const Canvas = require("../components/Canvas").default;
const Polygon = require("../components/Polygon").default;

storiesOf("Polygon", module)

  .add("fill", () => (
    <Canvas>
      <Polygon fill="black" points="60,20 100,40 100,80 60,100 20,80 20,40" />
    </Canvas>
  ))

  .add("stroke", () => (
    <Canvas>
      <Polygon stroke="black" points="60,20 100,40 100,80 60,100 20,80 20,40" />
    </Canvas>
  ))

  .add("strokeWidth", () => (
    <Canvas>
      <Polygon stroke="black" strokeWidth={20} points="60,20 100,40 100,80 60,100 20,80 20,40" />
    </Canvas>
  ))


