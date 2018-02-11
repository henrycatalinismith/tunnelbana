const React = require("react");
const PropTypes = require("prop-types");

export default class Shape extends React.PureComponent {
  static propTypes = {
    context: PropTypes.object,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.context || !nextProps.context) {
      return;
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

