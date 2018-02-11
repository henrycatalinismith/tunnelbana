const React = require("react");
const PropTypes = require("prop-types");

export default class Canvas extends React.PureComponent {
  static propTypes = {
    draw: PropTypes.func,
  };

  static defaultProps = {
    draw: () => {},
  };

  componentDidMount() {
    const context = this.canvas.getContext("2d");
    this.props.draw(context);
  }

  render() {
    return (
      <canvas ref={canvas => {
        this.canvas = canvas;
      }} />
    );
  }
}

