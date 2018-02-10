const React = require("react");
const PropTypes = require("prop-types");
const { connect } = require("react-redux");
const select = require("../reducers").selectors;

const Camera = require("../containers/Camera").default;

export class HighValley extends React.PureComponent {
  static propTypes = {
  };

  render() {
    return <Camera id="main" />;
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps)(HighValley);

