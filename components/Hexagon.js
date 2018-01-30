const React = require("react");
const PropTypes = require("prop-types");
const { connect } = require("react-redux");

const cube = require("../geometry/cube").default;
const actions = require("../actions").default;
const select = require("../reducers").selectors;

const Terrain = require("./Terrain").default;

export class Hexagon extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    hexagon: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.selectHexagon = () => {
      this.props.selectHexagon(this.props.id);
    }
  }

  render() {
    const { hexagon } = this.props;

    const centerAng = 2 * Math.PI / 6;
    const round = n => Number(n.toFixed(3));
    const deg2rad = degs => Math.PI * degs / 180;

    const diagonal = 100;
    const offset = 2;

    const center = cube.pixels(hexagon, diagonal / 2);

    const startAng = deg2rad(90);
    const radius = diagonal / 2;

    let points = []
    for (let i = 0; i < 6; i++) {
      const ang = startAng + (i * centerAng);
      const x = (offset / 2) + (radius * Math.cos(ang));
      const y = (offset / 1.5) - (radius * Math.sin(ang));
      points.push([x, y]);
    }

    points = points.map(point => point.map(round));

    const translate = `translate(${Math.round(center.x)}, ${Math.round(center.y)})`;

    return (
      <g className="Hexagon" transform={translate}>
        <polygon onClick={this.selectHexagon} stroke="#888" points={points}/>
        <Terrain id={hexagon.terrainId} hexagonId={hexagon.id} />
      </g>
    );
  }
}

const mapStateToProps = (state, { id }) => {
  const hexagon = select("hexagons").from(state).byId(id);

  return { hexagon };
};

const mapDispatchToProps = dispatch => {
  return {
    selectHexagon: id => dispatch(actions.selectHexagon(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Hexagon);

