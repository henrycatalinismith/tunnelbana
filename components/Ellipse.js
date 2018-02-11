const React = require("react");
const PropTypes = require("prop-types");

const Shape = require("./Shape").default;

export default class Circle extends Shape {
  static propTypes = {
    cx: PropTypes.number,
    cy: PropTypes.number,
    rx: PropTypes.number,
    ry: PropTypes.number,
    fill: PropTypes.string,
    stroke: PropTypes.string,
    strokeWidth: PropTypes.number,
  };

  static defaultProps = {
    cx: 0,
    cy: 0,
    rx: 0,
    ry: 0,
  };

  draw(context) {
    const { cx, cy, rx, ry, fill, stroke, strokeWidth } = this.props;

    context.beginPath();
    context.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);

    if (fill) {
      context.fillStyle = fill;
      context.fill();
    }

    if (stroke) {
      context.strokeStyle = stroke;
      context.lineWidth = strokeWidth;
      context.stroke();
    }
  }
}


