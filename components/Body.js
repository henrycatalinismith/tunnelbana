const React = require("react");
const PropTypes = require("prop-types");
const { connect } = require("react-redux");

//const cube = require("../geometry/cube").default;
//const actions = require("../actions").default;
//const select = require("../reducers").selectors;

export class Body extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
  };

  static defaultProps = {
    id: "-x",
  };


  render() {
    const style = {
      fill: "#d8d8d8",
      stroke: "#979797",
    };

    const text = {
      transform: [
        `scale(1.6)`,
        `translate(${-13}, ${2})`,
      ].join(" ")
    };

    const scaleX = this.props.frame === "-x" ? 1.7 : -1.7;

    const transform = [
      `scale(${scaleX} ${1.7})`,
      `translate(${-12}, ${-30})`,
    ].join(" ");

    let bits = [
      <ellipse key="Leg" cx="5.5" cy="33.5" rx="2.5" ry="3.5" {...style}></ellipse>,
      <circle key="Body" cx="12.5" cy="28.5" r="9.5" {...style}></circle>,
      <ellipse key="Leg" cx="16.5" cy="36.5" rx="2.5" ry="3.5" {...style}></ellipse>,
      <ellipse key="Leg" transform="translate(15.883383, 28.273193) scale(-1, 1) rotate(-29.000000) translate(-15.883383, -28.273193) " cx="15.8833829" cy="28.273193" rx="2.5" ry="3.5" {...style}></ellipse>,
      <circle key="Head" cx="12.5" cy="12.5" r="12.5" {...style}></circle>,
      <text key="Face" x="12.5" y="12.5" {...text}>😎</text>,
    ];

    return (
      <g className="Body" transform={transform}>
        {bits}
      </g>
    );
  }
}

const mapStateToProps = (state) => {
  //const station = select("stations").from(state).byId(id);
  //const hexagon = select("hexagons").from(state).byId(station.get("hexagonId"));
  //const terrain = select("terrains").from(state).byId(hexagon.get("terrainId"));
  return {};
};

export default connect(mapStateToProps)(Body);

