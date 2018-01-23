const React = require("react");

const Camera = require("./Camera").default;

export default class HighValley extends React.PureComponent {
  render() {
    return [
      <div key="1">&lt;HighValley /&gt;</div>,
      <Camera key="2" />,
    ];
  }
}
