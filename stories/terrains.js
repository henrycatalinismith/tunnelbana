const React = require("react");
const { storiesOf, action, linkTo } = require("@storybook/react");

const Story = require("./Story").default;
const Terrain = require("../components/Terrain").default;

storiesOf("Terrain", module)

  .add("grass", () => (
    <Story scale={3}>
      <Terrain id="grass" />
    </Story>
  ))

  .add("water", () => (
    <Story scale={3}>
      <Terrain id="water" />
    </Story>
  ))

  .add("forest", () => (
    <Story scale={3}>
      <Terrain id="forest" />
    </Story>
  ))

  .add("city", () => (
    <Story scale={3}>
      <Terrain id="city" />
    </Story>
  ))


