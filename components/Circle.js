const React = require("react");
const PropTypes = require("prop-types");

const Shape = require("./Shape").default;
const Ellipse = require("./Ellipse").default;

export default class Circle extends Ellipse {
  static propTypes = {
    r: PropTypes.number,
  };

  static defaultProps = {
    r: 0,
  };

  render() {
    return <Ellipse {...this.props} rx={this.props.r} ry={this.props.r} />
  }
}


