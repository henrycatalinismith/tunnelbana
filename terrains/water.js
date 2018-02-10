const React = require("react");
const PropTypes = require("prop-types");

const { Hexagon } = require("../components/Hexagon");
const { Cliff } = require("../components/Cliff");

export const terrain = {
  id: "water",
  color: "#2369a6",
  side: "#174d7c",
  height: 2,
}

export class Water extends React.PureComponent {
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
