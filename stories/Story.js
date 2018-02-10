const React = require("react");
const PropTypes = require("prop-types");

const Svg = require("../components/Svg").default;

class Story extends React.PureComponent {
  static propTypes = {
    children: PropTypes.any,
    scale: PropTypes.number,
  };

  static defaultProps = {
    children: null,
    scale: 1,
  };

  constructor(...props) {
    super(...props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }

  updateDimensions = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    const { children, scale } = this.props;
    const { width, height } = this.state;

    return (
      <Svg x={-width/2 * 1/scale} y={-height/2 * 1/scale} width={width/scale} height={height/scale}>
        {children}
      </Svg>
    );
  }
}



export default Story;
