const React = require("react");

export default class Camera extends React.PureComponent {
  render() {
    const viewbox = [0, 0, 400, 400].join(" ");

    return (
      <svg viewBox={viewbox}>
        <circle cx="100" cy="100" r="100" />
      </svg>
    );
  }
}
