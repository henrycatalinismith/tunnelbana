const React = require("react");
const PropTypes = require("prop-types");
const { connect } = require("react-redux");

const cube = require("../geometry/cube").default;
const actions = require("../actions").default;
const thunks = require("../thunks").default;
const select = require("../reducers").selectors;

const Hex = ({ x, y, z }) => (
  <rect
    key={`building(${x}-${y})`}
    x={x}
    y={y}
    width={16}
    height={32}
    stroke="#333"
    strokeWidth="4"
    fill="#999"
  />
);

export class Terrain extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    hexagonId: PropTypes.string,
    terrain: PropTypes.object,
    hexagon: PropTypes.object,
    tapHexagon: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.tapHexagon = () => {
      const [, x, y, z] = this.props.hexagonId.split(",");
      this.props.tapHexagon(x, y, z);
    }
  }

  render() {
    const hexagon = this.props.hexagon.toJS();
    const terrain = this.props.terrain.toJS();

    const centerAng = 2 * Math.PI / 6;
    const round = n => Number(n.toFixed(3));
    const deg2rad = degs => Math.PI * degs / 180;

    const height = terrain.height;
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
      .map(point => point.map(round))

    points = points.map(point => point.map(round));

    const fill = hexagon.isSelected ? "yellow" : terrain.color;

    const cool = terrain.height > 0 && <polygon key="3" stroke={terrain.side} fill={terrain.side} points={sides} />;

    let extras = null;

    if (terrain.id === "city") {

      const BuildingHex = ({ x, y, z }) => (
        <rect
          key={`building(${x}-${y})`}
          x={x}
          y={y}
          width={16}
          height={32}
          stroke="#333"
          strokeWidth="4"
          fill="#999"
        />
      );

      extras = [
        building(20, -58),
        building(20, -28),
        building(0, -58),
        building(-20, -58),
      ];
    }

    return [
      <polygon key="2" onClick={this.tapHexagon} stroke={fill} fill={fill} points={points} />,
      extras,
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
    tapHexagon: (x, y, z) => dispatch(thunks.tapHexagon(x, y, z)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Terrain);

