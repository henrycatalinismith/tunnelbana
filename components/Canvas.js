const React = require("react");
const PropTypes = require("prop-types");
const _ = require("lodash");

export default class Canvas extends React.Component {
  static propTypes = {
    draw: PropTypes.func,
    chilren: PropTypes.any,
    width: PropTypes.number,
    height: PropTypes.number,
  };

  static defaultProps = {
    draw: () => {},
    width: window.innerWidth,
    height: window.innerHeight,
  };

  static childContextTypes = {
    context: PropTypes.object,
  };

  getChildContext() {
    return {
      context: this.state.context
    };
  }

  constructor(...props) {
    super(...props);
    this.state = {
      context: undefined,
    };
  }

  setCanvas = canvas => {
    this.canvas = canvas;
  };

  componentDidMount() {
    if (this.state.context || this.context.renderer === "svg") {
      return;
    }

    const context = this.canvas.getContext("2d");
    this.props.draw(context);
    this.setState({ context });
  }

  render() {
    return (
      <canvas key={1} ref={this.setCanvas} width={this.props.width} height={this.props.height}>
        {this.state.context && this.props.children}
      </canvas>
    );
  }
}

