const React = require("react");
const PropTypes = require("prop-types");
const { connect } = require("react-redux");
const select = require("../reducers").selectors;
const Hexagon = require("./Hexagon").default;

export class Camera extends React.PureComponent {
  static propTypes = {
    actors: PropTypes.object,
  };

  render() {
    const { actors } = this.props;
    const viewbox = [0, 0, 400, 400].join(" ");

    return (
      <svg viewBox={viewbox}>
        <Hexagon />
      </svg>
    );
  }
}

const mapStateToProps = state => {
  return {
    actors: select("actors")
      .from(state)
      .all(),
  };
};

export default connect(mapStateToProps)(Camera);

