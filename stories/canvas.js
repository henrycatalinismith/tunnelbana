const React = require("react");
const { storiesOf, action, linkTo } = require("@storybook/react");

const Canvas = require("../components/Canvas").default;

storiesOf("Canvas", module)

  .add("draw", () => (
    <Canvas draw={ctx => {
      ctx.fillStyle = "#000000";
      ctx.fillRect(50, 50, 100, 100);
    }} />
  ))


