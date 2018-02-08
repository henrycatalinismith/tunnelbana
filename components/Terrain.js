const React = require("react");
const PropTypes = require("prop-types");
const { connect } = require("react-redux");

const cube = require("../geometry/cube").default;
const actions = require("../actions").default;
const thunks = require("../thunks").default;
const select = require("../reducers").selectors;

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

    const center = {
      x: 0,
      y: 0 - terrain.height,
    };

    let points = cube.sides(center, 50);

    const walls = points
      .slice(2, 5)
      .map(point => [point[0], point[1] + terrain.height])
      .concat(points.slice(2, 5).reverse());

    const fill = hexagon.isSelected ? "yellow" : terrain.color;

    const wall = terrain.height > 0 && <polygon key="3" stroke={terrain.side} fill={terrain.side} points={walls} />;

    let extras = null;

    if (terrain.id === "city") {
      const building = (x, y) => (
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
      wall,
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

