const React = require("react");
const PropTypes = require("prop-types");

const contextProps = {
  fill: "fillStyle",
  stroke: "strokeStyle",
  strokeWidth: "strokeWidth",
};

export default class Shape extends React.PureComponent {
  static propTypes = {
    context: PropTypes.object,
    fill: PropTypes.string,
    stroke: PropTypes.string,
    strokeWidth: PropTypes.number,
  };

  static defaultProps = {
    fill: undefined,
    stroke: "none",
    strokeWidth: 0,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.context || !nextProps.context) {
      return;
    }

    for (let svgName in contextProps) {
      nextProps.context[contextProps[svgName]] = this.props[svgName];
    }

    this.draw(nextProps.context);
  }

  draw(context) {
    throw new Error('Cannot render abstract <Shape /> directly')
  }

  render() {
    return null;
  }
}

