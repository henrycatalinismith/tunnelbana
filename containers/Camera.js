const React = require("react");
const PropTypes = require("prop-types");
const { connect } = require("react-redux");

const Cube = require("../components/Cube").default;
const Terrain = require("../components/Terrain").default;
const Robot = require("../components/Robot").default;
const select = require("../reducers").selectors;
const Station = require("./Station").default;
const Connection = require("./Connection").default;
const Train = require("./Train").default;

export class Camera extends React.PureComponent {
  static propTypes = {
    camera: PropTypes.object,
    hexagons: PropTypes.object,
    robots: PropTypes.object,
    stations: PropTypes.object,
    viewport: PropTypes.object,
    connections: PropTypes.object,
    trains: PropTypes.object,
  };

  render() {
    const stations = this.props.stations;
    const hexagons = this.props.hexagons.toJS();
    const robots = this.props.robots.toJS();
    const camera = this.props.camera.toJS();
    const viewport = this.props.viewport.toJS();
    const connections = this.props.connections.toJS();
    const trains = this.props.trains.toJS();

    const center = { x: 0, y: 0 };
    const width = viewport.width * camera.zoom;
    const height = viewport.height * camera.zoom;
    const x = 0 - (width / 2) + (center.x * 1);
    const y = 0 - (height / 2) + (center.y * 1);

    const viewbox = [x, y, width, height].join(" ");

    /*

      cube.radius(cube(), camera.radius).map(({ x, y, z }) => (
        <Cube x={x} y={y} z={z}>
          <Terrain {...terrain(x, y, z).props} />
        </Cube>
      ))

    */

    return (
      <div className="Camera">
      <svg draggable="false" viewBox={viewbox} className="Camera__svg">

        {hexagons.map((hexagon, i) => (
          <Cube key={`cube${i}`} x={hexagon.x} y={hexagon.y} z={hexagon.z}>
            <Terrain id={hexagon.terrainId} />
          </Cube>
        ))}

        {robots.map((robot, i) => (
          <Robot key={`robot${i}`} x={robot.x} y={robot.y} z={robot.z} />
        ))}

        {connections.map((connection, i) => {
          return <Connection key={connection.id} id={connection.id} />;
        })}

        {trains.map(train => {
          return <Train key={train.id} id={train.id} />;
        })}

        {stations.map((station, i) => {
          return <Station key={station.get("id")} id={station.get("id")} />;
        })}
      </svg>
      </div>
    );
  }
}

const mapStateToProps = (state, { id }) => {
  const camera = select("cameras").from(state).byId(id);
  const stations = select("stations").from(state).byCell(camera.get("cellId"));
  const hexagons = select("hexagons").from(state).forCamera(camera);
  const viewport = select("viewport").from(state).dimensions();
  const robots = select("robots").from(state).all();
  const connections = select("connections").from(state).all();
  const trains = select("trains").from(state).byCell(camera.get("cellId"));

  return { camera, hexagons, stations, viewport, connections, trains, robots };
};

export default connect(mapStateToProps)(Camera);

