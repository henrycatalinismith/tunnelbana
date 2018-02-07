const React = require("react");
const PropTypes = require("prop-types");
const { connect } = require("react-redux");

const select = require("../reducers").selectors;
const Hexagon = require("./Hexagon").default;
const Station = require("./Station").default;
const Connection = require("./Connection").default;
const Train = require("./Train").default;

export class Camera extends React.PureComponent {
  static propTypes = {
    camera: PropTypes.object,
    hexagons: PropTypes.object,
    stations: PropTypes.object,
    viewport: PropTypes.object,
    connections: PropTypes.object,
    trains: PropTypes.object,
  };

  render() {
    const stations = this.props.stations;
    const hexagons = this.props.hexagons;
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

console.log(trains);
    return (
      <div className="Camera">
      <svg draggable="false" viewBox={viewbox} className="Camera__svg">
        {hexagons.map((hexagon, i) => {
          return <Hexagon key={hexagon.get("id")} id={hexagon.get("id")} />;
        })}

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
  const connections = select("connections").from(state).all();
  const trains = select("trains").from(state).byCell(camera.get("cellId"));

  return { camera, hexagons, stations, viewport, connections, trains };
};

export default connect(mapStateToProps)(Camera);

