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
  };

  render() {
    const train = this.props.train.toJS();
    const terrain = this.props.terrain.toJS();

    const centerAng = 2 * Math.PI / 6;
    const round = n => Number(n.toFixed(3));
    const deg2rad = degs => Math.PI * degs / 180;

    const diagonal = 100;
    const offset = 2;

    const center = cube.pixels(train, diagonal / 2);
    const translate = `translate(${Math.round(center.x)}, ${Math.round(center.y - terrain.height)})`;

    return (
      <g className="Train" transform={translate}>
        <circle r={20} fill="gray" />
      </g>
    );
  }
}

const mapStateToProps = (state, { id }) => {
  const train = select("trains").from(state).byId(id);
  const terrain = select("terrains").from(state).byId(train.get("terrainId"));
  return { train, terrain };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Train);

