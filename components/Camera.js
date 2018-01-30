const React = require("react");
const PropTypes = require("prop-types");
const { connect } = require("react-redux");

const select = require("../reducers").selectors;
const Hexagon = require("./Hexagon").default;
const Station = require("./Station").default;

export class Camera extends React.PureComponent {
  static propTypes = {
    camera: PropTypes.object,
    hexagons: PropTypes.object,
    stations: PropTypes.object,
    viewport: PropTypes.object,
  };

  render() {
    const stations = this.props.stations;
    const hexagons = this.props.hexagons;
    const camera = this.props.camera.toJS();
    const viewport = this.props.viewport.toJS();

    const viewbox = [
      0 - (viewport.width / 2) + camera.x,
      0 - (viewport.height / 2) + camera.y,
      viewport.width,
      viewport.height
    ].join(" ");

    return (
      <svg draggable="false" viewBox={viewbox}>
        {hexagons.map((hexagon, i) => {
          return <Hexagon key={hexagon.get("id")} id={hexagon.get("id")} />;
        })}
        {stations.map((stations, i) => {
          return <Station key={stations.get("id")} id={stations.get("id")} />;
        })}
      </svg>
    );
  }
}

const mapStateToProps = (state, { id }) => {
  const camera = select("cameras").from(state).byId(id);
  const stations = select("stations").from(state).byCell(camera.get("cellId"));
  const hexagons = select("hexagons").from(state).byCell(camera.get("cellId"));
  const viewport = select("viewport").from(state).dimensions();

  return { camera, hexagons, stations, viewport };
};

export default connect(mapStateToProps)(Camera);

