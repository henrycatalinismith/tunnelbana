const React = require("react");
const PropTypes = require("prop-types");
const { connect } = require("react-redux");

const cube = require("../geometry/cube").default;
const actions = require("../actions").default;
const select = require("../reducers").selectors;

export class Station extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    station: PropTypes.object,
    hexagon: PropTypes.object,
  };

  render() {
    const { station, hexagon } = this.props;

    const centerAng = 2 * Math.PI / 6;
    const round = n => Number(n.toFixed(3));
    const deg2rad = degs => Math.PI * degs / 180;

    const diagonal = 100;
    const offset = 2;

    const center = cube.pixels(hexagon, diagonal / 2);
    const translate = `translate(${Math.round(center.x)}, ${Math.round(center.y)})`;

    return (
      <g className="Station" transform={translate}>
        <circle
          cx={0}
          cy={0}
          r={10}
          stroke="black"
          strokeWidth="5"
          fill="white"
        />
      </g>
    );
  }
}

const mapStateToProps = (state, { id }) => {
  const station = select("stations").from(state).byId(id);
  const hexagon = select("hexagons").from(state).byId(station.hexagonId);
  return { station, hexagon };
};

const mapDispatchToProps = dispatch => {
  return {
    selectHexagon: id => dispatch(actions.selectHexagon(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Station);

