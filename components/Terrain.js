
const React = require("react");
const PropTypes = require("prop-types");
const { connect } = require("react-redux");

const cube = require("../geometry/cube").default;
const actions = require("../actions").default;
const select = require("../reducers").selectors;

export class Terrain extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    hexagonId: PropTypes.string,
    terrain: PropTypes.object,
    hexagon: PropTypes.object,
    selectHexagon: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.selectHexagon = () => {
      this.props.selectHexagon(this.props.hexagonId);
    }
  }

  render() {
    const hexagon = this.props.hexagon.toJS();
    const terrain = this.props.terrain.toJS();

    const centerAng = 2 * Math.PI / 6;
    const round = n => Number(n.toFixed(3));
    const deg2rad = degs => Math.PI * degs / 180;

    const height = 20;
    const diagonal = 100;
    const offset = 2;

    //const center = cube.pixels(hexagon, diagonal / 2);
    const center = { x: 0, y: 0};

    const startAng = deg2rad(90);
    const radius = diagonal / 2;

    let points = []
    for (let i = 0; i < 6; i++) {
      const ang = startAng + (i * centerAng);
      const x = (offset / 2) + center.x + (radius * Math.cos(ang));
      const y = (offset / 1.5) + center.y - (radius * Math.sin(ang)) - terrain.height;
      points.push([x, y]);
    }

    const sides = points
      .slice(2, 5)
      .map(point => [point[0], point[1] + height])
      .concat(points.slice(2, 5).reverse())

    points = points.map(point => point.map(round));

    const fill = hexagon.isSelected ? "yellow" : terrain.color;

    const cool = terrain.height > 0 && <polygon key="3" fill={terrain.side} points={sides} />;

    return [
      <polygon key="2" onClick={this.selectHexagon} stroke={fill} fill={fill} points={points} />,
      cool
    ];
  }
}

const mapStateToProps = (state, { id, hexagonId }) => {
  const terrain = select("terrains").from(state).byId(id);
  const hexagon = select("hexagons").from(state).byId(hexagonId);
  return {
    terrain,
    hexagon,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectHexagon: id => dispatch(actions.selectHexagon(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Terrain);

