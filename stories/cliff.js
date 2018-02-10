const React = require("react");
const { storiesOf, action, linkTo } = require("@storybook/react");

const cube = require("../geometry/cube").default;
const { Cliff } = require("../components/Cliff");

storiesOf("Cliff", module)

  .add("stroke", () => (
    <svg viewBox="-100 -100 300 320" width="100%" height="100%">
      <Cliff radius={100} stroke="red" />
    </svg>
  ))

  .add("strokeWidth", () => (
    <svg viewBox="-100 -100 300 320" width="100%" height="100%">
      <Cliff radius={80} stroke="red" strokeWidth={20} />
    </svg>
  ))

  .add("fill", () => (
    <svg viewBox="-100 -100 300 320" width="100%" height="100%">
      <Cliff radius={80} stroke="red" fill="red" />
    </svg>
  ))


