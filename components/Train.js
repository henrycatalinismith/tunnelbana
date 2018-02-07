const React = require("react");
const PropTypes = require("prop-types");
const { connect } = require("react-redux");

const cube = require("../geometry/cube").default;
const actions = require("../actions").default;
const select = require("../reducers").selectors;

export class Train extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    train: PropTypes.object,
    terrain: PropTypes.object,
    journey: PropTypes.object,
    station: PropTypes.object,
  };

  render() {
    const train = this.props.train.toJS();
    const terrain = this.props.terrain.toJS();

    let isMoving;

    let journey = this.props.journey;
    if (journey) {
      journey = journey.toJS();
      isMoving = true;
    }

    let station = this.props.station;
    if (station) {
      station = station.toJS();
      isMoving = false;
    }

    const centerAng = 2 * Math.PI / 6;
    const round = n => Number(n.toFixed(3));
    const deg2rad = degs => Math.PI * degs / 180;

    const diagonal = 100;
    const offset = 2;

    const center = cube.pixels(train, diagonal / 2);
    const translate = `translate(${Math.round(center.x)}, ${Math.round(center.y - terrain.height)})`;

    const radius = isMoving ? 10 : 20;

    return (
      <g className="Train" id={`train${train.id}`} transform={translate}>
        <circle r={radius} fill="gray" />
      </g>
    );
  }
}

const mapStateToProps = (state, { id }) => {
  const train = select("trains").from(state).byId(id);
  const terrain = select("terrains").from(state).byId(train.get("terrainId"));
  const journey = select("journeys").from(state).byId(train.get("journeyId"));
  const station = select("stations").from(state).byId(train.get("stationId"));
  return { train, terrain, journey, station };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Train);

