const React = require("react");
const PropTypes = require("prop-types");
const { connect } = require("react-redux");

const select = require("../reducers").selectors;

const Cube = require("../components/Cube").default;
const Terrain = require("../terrains").default;

export class Hexagon extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    hexagon: PropTypes.object,
  };

  render() {
    const hexagon = this.props.hexagon.toJS();
    const { x, y, z } = hexagon;
    return (
      <Cube x={x} y={y} z={z}>
        <Terrain id={hexagon.terrainId} />
      </Cube>
    );
  }
}

const mapStateToProps = (state, { id }) => {
  const hexagon = select("hexagons").from(state).byId(id);

  return { hexagon };
};

export default connect(mapStateToProps)(Hexagon);
