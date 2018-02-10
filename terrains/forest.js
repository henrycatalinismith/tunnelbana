const React = require("react");
const PropTypes = require("prop-types");

const { Hexagon } = require("../components/Hexagon");
const { Cliff } = require("../components/Cliff");

export const terrain = {
  id: "forest",
  color: "#152d07",
  side: "#071a04",
  height: 18,
}

export class Forest extends React.PureComponent {
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
