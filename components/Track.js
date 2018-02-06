const React = require("react");
const PropTypes = require("prop-types");
const { connect } = require("react-redux");

const cube = require("../geometry/cube").default;
const select = require("../reducers").selectors;

export class Track extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    track: PropTypes.object,
    sourceTerrain: PropTypes.object,
    destinationTerrain: PropTypes.object,
  };

  render() {
    const track = this.props.track.toJS();
    const sourceTerrain = this.props.sourceTerrain.toJS();
    const destinationTerrain = this.props.destinationTerrain.toJS();

    const fromHex = { x: track.x1, y: track.y1, z: track.z1 };
    const toHex = { x: track.x2, y: track.y2, z: track.z2 };

    const fromPix = cube.pixels(fromHex, 50);
    const toPix = cube.pixels(toHex, 50);

    fromPix.y -= sourceTerrain.height;
    toPix.y -= destinationTerrain.height;
    const path = "M" + [fromPix.x, fromPix.y, toPix.x, toPix.y].join(" ");

    return (
      <g className="track" id={track.id}>
        <path d={path} strokeWidth={10} stroke="black" />
      </g>
    );
  }
}

const mapStateToProps = (state, { id }) => {
  const track = select("tracks").from(state).byId(id);
  const sourceHexagon = select("hexagons").from(state).at(0, track.get("x1"), track.get("y1"), track.get("z1"));
  const destinationHexagon = select("hexagons").from(state).at(0, track.get("x2"), track.get("y2"), track.get("z2"));
  const sourceTerrain = select("terrains").from(state).byId(sourceHexagon.get("terrainId"));
  const destinationTerrain = select("terrains").from(state).byId(destinationHexagon.get("terrainId"));
  return { track, sourceTerrain, destinationTerrain };
};

export default connect(mapStateToProps)(Track);

