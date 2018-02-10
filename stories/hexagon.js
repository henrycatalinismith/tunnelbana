const React = require("react");
const { storiesOf, action, linkTo } = require("@storybook/react");

const cube = require("../geometry/cube").default;
const Story = require("./Story").default;
const { Hexagon } = require("../components/Hexagon");

storiesOf("Hexagon", module)

  .add("stroke", () => (
    <Story scale={2}>
      <Hexagon radius={100} stroke="red" />
    </Story>
  ))

  .add("strokeWidth", () => (
    <Story scale={2}>
      <Hexagon radius={80} stroke="red" strokeWidth={20} />
    </Story>
  ))

  .add("fill", () => (
    <Story scale={2}>
      <Hexagon radius={100} fill="red" />
    </Story>
  ))


