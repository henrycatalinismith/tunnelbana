const React = require("react");
const PropTypes = require("prop-types");
const _ = require("lodash");

export default class Canvas extends React.PureComponent {
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

  constructor(...props) {
    super(...props);
    this.state = { context: undefined };
  }

  setCanvas = canvas => {
    this.canvas = canvas;
  };

  componentDidMount() {
    if (this.state.context) {
      return;
    }

    const context = this.canvas.getContext("2d");
    this.props.draw(context);
    this.setState({ context});
  }

  render() {
    let children = this.props.children;
    if (children && _.isArray(children)) {
      children = React.Children.map(
        children,
        child => React.cloneElement(child, this.state)
      );
    } else if (children) {
      children = React.cloneElement(children, this.state);
    }

    return (
      <canvas key={1} ref={this.setCanvas} width={this.props.width} height={this.props.height}>
        {children}
      </canvas>
    );
  }
}

