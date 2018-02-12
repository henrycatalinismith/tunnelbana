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
    return { context: this.state.context };
  }

  constructor(...props) {
    super(...props);
    this.state = {
      context: undefined,
    };
  }

  setCanvas = canvas => {
    console.log('setCanvas', canvas);
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
    let children = this.props.children;

    /*
    if (children && _.isArray(children)) {
      children = React.Children.map(
        children,
        child => React.cloneElement(child, this.state)
      );
    } else if (children) {
      children = React.cloneElement(children, this.state)
    }
    */

    console.log(children, this.state.context);

    return (
      <canvas key={1} ref={this.setCanvas} width={this.props.width} height={this.props.height}>
        {this.state.context && React.Children.map(this.props.children, c => {
          console.log(c);
          const withProp = React.cloneElement(c, {
            ctx: this.state.context
          });
          return withProp;
        })}
      </canvas>
    );
  }
}

