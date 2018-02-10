const React = require("react");
const PropTypes = require("prop-types");

const { Hexagon } = require("../components/Hexagon");
const { Cliff } = require("../components/Cliff");

export const terrain = {
  id: "grass",
  color: "#b3b128",
  side: "#8e8d1d",
  height: 10,
}

export class Grass extends React.PureComponent {
  render() {
    return [
      <Hexagon
        key="top"
        y={-terrain.height}
        stroke={terrain.color}
        fill={terrain.color}
      />,
      <Cliff
        key="sides"
        height={terrain.height}
        stroke={terrain.side}
        fill={terrain.side}
      />
    ];
  }
}
