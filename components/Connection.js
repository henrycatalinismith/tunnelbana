const React = require("react");
const PropTypes = require("prop-types");
const { connect } = require("react-redux");

const cube = require("../geometry/cube").default;
const actions = require("../actions").default;
const select = require("../reducers").selectors;

const Track = require("./Track").default;

export class Connection extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    connection: PropTypes.object,
    tracks: PropTypes.object,
  };

  render() {
    const connection = this.props.connection.toJS();
    const tracks = this.props.tracks.toJS();

    return (
      <g className="Connection">
        {tracks.map(track => {
          return <Track key={track.id} id={track.id} />;
        })}
      </g>
    );
  }
}

const mapStateToProps = (state, { id }) => {
  const connection = select("connections").from(state).byId(id);
  const tracks = select("tracks").from(state).byConnection(id);
  return { connection, tracks };
};

export default connect(mapStateToProps)(Connection);

