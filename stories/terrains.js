const React = require("react");
const { storiesOf, action, linkTo } = require("@storybook/react");

const Terrain = require("../components/Terrain").default;

storiesOf("Terrain", module)

  .add("grass", () => (
    <svg viewBox="-50 -60 100 120" style={{ maxHeight: "400px", maxWidth: "300px" }}>
      <Terrain
        height={10}
        color={"#b3b128"}
        cliff={"#8e8d1d"}
      />
    </svg>
  ))

  .add("water", () => (
    <svg viewBox="-50 -60 100 120" style={{ maxHeight: "400px", maxWidth: "300px" }}>
      <Terrain
        height={2}
        color={"#2369a6"}
        cliff={"#174d7c"}
      />
    </svg>
  ))

  .add("forest", () => (
    <svg viewBox="-50 -60 100 120" style={{ maxHeight: "400px", maxWidth: "300px" }}>
      <Terrain
        height={14}
        color={"#152d07"}
        cliff={"#071a04"}
      />
    </svg>
  ))

  .add("city", () => (
    <svg viewBox="-50 -60 100 120" style={{ maxHeight: "400px", maxWidth: "300px" }}>
      <Terrain
        height={10}
        color={"#a8a775"}
        cliff={"#8e8d1d"}
      />
    </svg>
  ))


