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

    const centerAng = 2 * Math.PI / 6;
    const round = n => Number(n.toFixed(3));
    const deg2rad = degs => Math.PI * degs / 180;

    const diagonal = 100;
    const offset = 2;

    const center = cube.pixels(hexagon, diagonal / 2);
    const translate = `translate(${Math.round(center.x)}, ${Math.round(center.y - terrain.height)})`;

    const startAng = deg2rad(90);
    const radius = diagonal / 2;

    const contents = [];

    if (station.isSelected) {
      let points = []
      for (let i = 0; i < 6; i++) {
        const ang = startAng + (i * centerAng);
        const x = (offset / 2) + 0 + (radius * Math.cos(ang));
        const y = (offset / 1.5) + 0 - (radius * Math.sin(ang));
        points.push([x, y]);
      }
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

