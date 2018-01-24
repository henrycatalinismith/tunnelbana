const React = require("react");
const PropTypes = require("prop-types");
const { connect } = require("react-redux");
const select = require("../reducers").selectors;

const Camera = require("./Camera").default;

export class HighValley extends React.PureComponent {
  static propTypes = {
    actors: PropTypes.object,
    hexagons: PropTypes.array,
  };

  render() {
    return [
      <Camera key="2" />,
    ];
  }
}

const mapStateToProps = state => {
  return {
    actors: select("actors")
      .from(state)
      .all(),
    hexagons: select("hexagons")
      .from(state)
      .all(),
  };
};

export default connect(mapStateToProps)(HighValley);

