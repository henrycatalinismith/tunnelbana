const React = require("react");
const PropTypes = require("prop-types");
const { storiesOf, action, linkTo } = require("@storybook/react");

const Rect = require("../components/Rect").default;
const RendererToggle = require("../configuration/RendererToggle").default;

storiesOf("Rect", module)
  .addDecorator(Story => <RendererToggle><Story /></RendererToggle>)

  .add("fill", () => [
    <Rect key={1} fill="#00ff00" x={50} y={50} width={100} height={100} />,
    <Rect key={2} fill="#ff00ff" x={200} y={200} width={100} height={100} />,
  ])

  .add("stroke", () => [
    <Rect key={1} stroke="blue" x={50} y={50} width={100} height={100} />,
    <Rect key={2} stroke="green" x={200} y={200} width={100} height={100} />,
  ])

  .add("strokeWidth", () => [
    <Rect key={1} stroke="blue" strokeWidth={20} x={50} y={50} width={100} height={100} />,
    <Rect key={2} stroke="green" strokeWidth={20} x={200} y={200} width={100} height={100} />,
  ])


