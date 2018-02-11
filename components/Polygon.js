const React = require("react");
const PropTypes = require("prop-types");

const Shape = require("./Shape").default;

export default class Polygon extends Shape {
  static propTypes = {
    points: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    fill: PropTypes.string,
    stroke: PropTypes.string,
    strokeWidth: PropTypes.number,
  };

  static defaultProps = {
    points: [],
  };

  draw(context) {
    const { fill, stroke, strokeWidth } = this.props;

    const points = typeof this.props.points === "string"
      ? this.props.points.split(" ").map(p => p.split(","))
      : this.props.points;

    context.beginPath();
    for (let i = 0; i < points.length; i++) {
      context.lineTo(points[i][0], points[i][1]);
    }
    context.lineTo(points[0][0], points[0][1]);

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


