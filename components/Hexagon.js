const React = require("react");
const PropTypes = require("prop-types");
const { connect } = require("react-redux");

const cube = require("../geometry/cube").default;
const actions = require("../actions").default;
const select = require("../reducers").selectors;

const Terrain = require("../terrains").default;

export class Hexagon extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    hexagon: PropTypes.object,
  };

  render() {
    const hexagon = this.props.hexagon.toJS();
    const center = cube.pixels(hexagon, 50);
    const translate = `translate(${Math.round(center.x)}, ${Math.round(center.y)})`;

    return (
      <g className="Hexagon" id={hexagon.id} transform={translate}>
        <Terrain id={hexagon.terrainId} />
      </g>
    );
  }
}

const mapStateToProps = (state, { id }) => {
  const hexagon = select("hexagons").from(state).byId(id);

  return { hexagon };
};

export default connect(mapStateToProps)(Hexagon);
