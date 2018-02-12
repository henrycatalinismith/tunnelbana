const React = require("react");
const PropTypes = require("prop-types");

export default class Shape extends React.Component {
  static propTypes = {
    context: PropTypes.object,
  };

  static contextTypes = {
    renderer: PropTypes.string,
    context: PropTypes.object,
  };

  componentDidMount() {
    console.log('componentDidMount', this.props, this.context);
    if (this.context.context) {
      this.draw(this.context.context);
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('shouldComponentUpdate');
    return true;
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps.context);
    if (this.props.context || !nextProps.context || this.context.renderer !== "canvas") {
      return;
    }

    this.draw(nextProps.context);
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

