const React = require("react");
const PropTypes = require("prop-types");

const Shape = require("./Shape").default;

export default class Rect extends Shape {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    fill: PropTypes.string,
  };

  static defaultProps = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  draw(context) {
    const { x, y, width, height } = this.props;

    if (this.props.fill) {
      context.fillStyle = this.props.fill;
      context.fillRect(x, y, width, height);
    }

    if (this.props.stroke) {
      context.strokeStyle = this.props.stroke;
      context.lineWidth = this.props.strokeWidth;
      context.strokeRect(x, y, width, height);
    }
  }
}


