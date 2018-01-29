const React = require("react");
const PropTypes = require("prop-types");
const { connect } = require("react-redux");

const select = require("../reducers").selectors;
const Hexagon = require("./Hexagon").default;
const Station = require("./Station").default;

export class Camera extends React.PureComponent {
  static propTypes = {
    actors: PropTypes.object,
    camera: PropTypes.object,
    hexagons: PropTypes.array,
    stations: PropTypes.array,
    viewport: PropTypes.object,
  };

  render() {
    const { actors, camera, hexagons, stations, viewport } = this.props;

    const viewbox = [
      0 - (viewport.width / 2) + camera.x,
      0 - (viewport.height / 2) + camera.y,
      viewport.width,
      viewport.height
    ].join(" ");

    return (
      <svg draggable="false" viewBox={viewbox}>
        {hexagons.map((hexagon, i) => {
          return <Hexagon key={hexagon.id} id={hexagon.id} />;
        })}
        {stations.map((stations, i) => {
          return <Station key={stations.id} id={stations.id} />;
        })}
      </svg>
    );
  }
}

const mapStateToProps = state => {
  const camera = select("camera").from(state).all();
  const stations = select("stations").from(state).all();
  return {
    actors: select("actors")
      .from(state)
      .all(),
    camera,
    stations,
    hexagons: select("hexagons")
      .from(state)
      .byCell(camera.cellId),
    viewport: select("viewport")
      .from(state)
      .dimensions(),
  };
};

export default connect(mapStateToProps)(Camera);

