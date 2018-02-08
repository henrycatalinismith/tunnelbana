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
    terrain: PropTypes.object,
  };

  render() {
    const hexagon = this.props.hexagon.toJS();
    const station = this.props.station.toJS();
    const terrain = this.props.terrain.toJS();

    const center = cube.pixels(hexagon, 50);
    center.y -= terrain.height;
    const translate = `translate(${Math.round(center.x)}, ${Math.round(center.y)})`;

    const contents = [];

    if (station.isSelected) {
      const points = cube.sides({ x: 0, y: 0}, 50);
      const fill = "yellow"
      contents.push(
        <polygon
          key="2"
          className="Selection"
          onClick={this.tapHexagon}
          fill="transparent"
          points={points}
        />
      );
    }

    contents.push(

      <circle
        key="1"
        cx={0}
        cy={0}
        r={10}
        stroke="black"
        strokeWidth="5"
        fill="white"
      />

    );

    return (
      <g className="Station" transform={translate}>
        {contents}
      </g>
    );
  }
}

const mapStateToProps = (state, { id }) => {
  const station = select("stations").from(state).byId(id);
  const hexagon = select("hexagons").from(state).byId(station.get("hexagonId"));
  const terrain = select("terrains").from(state).byId(hexagon.get("terrainId"));
  return { station, hexagon, terrain };
};

const mapDispatchToProps = dispatch => {
  return {
    selectHexagon: id => dispatch(actions.selectHexagon(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Station);

