const React = require("react");
const PropTypes = require("prop-types");

export default class Shape extends React.Component {
  static propTypes = {
  };

  static contextTypes = {
    renderer: PropTypes.string,
    context: PropTypes.object,
  };

  componentDidMount() {
    if (this.context.context) {
      this.draw(this.context.context);
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return true;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.context || !nextProps.context || this.context.renderer !== "canvas") {
      return;
    }

    this.draw(nextProps.context);
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    console.log(nextProps);
  }

  draw(context) {
    throw new Error('Cannot draw abstract <Shape /> directly')
  }

  render() {
    if (this.context.renderer === "canvas") {
      return null;
    }
    throw new Error('Cannot render abstract <Shape /> directly')
  }
}

