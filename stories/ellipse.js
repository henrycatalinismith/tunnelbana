const React = require("react");
const { storiesOf, action, linkTo } = require("@storybook/react");

const Canvas = require("../components/Canvas").default;
const Ellipse = require("../components/Ellipse").default;

storiesOf("Ellipse", module)

  .add("fill", () => (
    <Canvas>
      <Ellipse fill="#00ff00" cx={100} cy={150} rx={50} ry={100} />
      <Ellipse fill="#ff00ff" cx={250} cy={300} rx={50} ry={100} />
    </Canvas>
  ))

  .add("stroke", () => (
    <Canvas>
      <Ellipse stroke="blue" cx={100} cy={150} rx={50} ry={100} />
      <Ellipse stroke="green" cx={250} cy={300} rx={50} ry={100} />
    </Canvas>
  ))

  .add("strokeWidth", () => (
    <Canvas>
      <Ellipse stroke="blue" strokeWidth={20} cx={100} cy={150} rx={50} ry={100} />
      <Ellipse stroke="green" strokeWidth={20} cx={250} cy={300} rx={50} ry={100} />
    </Canvas>
  ))


