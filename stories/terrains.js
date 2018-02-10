const React = require("react");
const { storiesOf, action, linkTo } = require("@storybook/react");

const Terrain = require("../components/Terrain").default;

storiesOf("Terrain", module)

  .add("grass", () => (
    <svg viewBox="-50 -60 100 120" style={{ maxHeight: "400px", maxWidth: "300px" }}>
      <Terrain id="grass" />
    </svg>
  ))

  .add("water", () => (
    <svg viewBox="-50 -60 100 120" style={{ maxHeight: "400px", maxWidth: "300px" }}>
      <Terrain id="water" />
    </svg>
  ))

  .add("forest", () => (
    <svg viewBox="-50 -60 100 120" style={{ maxHeight: "400px", maxWidth: "300px" }}>
      <Terrain id="forest" />
    </svg>
  ))

  .add("city", () => (
    <svg viewBox="-50 -60 100 120" style={{ maxHeight: "400px", maxWidth: "300px" }}>
      <Terrain id="city" />
    </svg>
  ))


