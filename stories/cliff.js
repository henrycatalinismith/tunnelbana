const React = require("react");
const { storiesOf, action, linkTo } = require("@storybook/react");

const cube = require("../geometry/cube").default;
const Story = require("./Story").default;
const Cliff = require("../components/Cliff").default;

storiesOf("Cliff", module)

  .add("fill", () => (
    <Story scale={2}>
      <Cliff radius={100} stroke="red" fill="red" />
    </Story>
  ))

  .add("stroke", () => (
    <Story scale={2}>
      <Cliff radius={100} stroke="red" />
    </Story>
  ))

  .add("strokeWidth", () => (
    <Story scale={2}>
      <Cliff radius={100} stroke="red" fill="white" strokeWidth={3} />
    </Story>
  ))


