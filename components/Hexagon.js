const React = require("react");
const PropTypes = require("prop-types");
const { connect } = require("react-redux");

const cube = require("../geometry/cube").default;
const actions = require("../actions").default;
const select = require("../reducers").selectors;

export class Hexagon extends React.PureComponent {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number,
    hexagon: PropTypes.object,
    selectHexagon: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.selectHexagon = () => {
      this.props.selectHexagon(this.props.id);
    }
  }

  render() {
    const { hexagon } = this.props;

    console.log(hexagon);

    const centerAng = 2 * Math.PI / 6;
    const round = n => Number(n.toFixed(3));
    const deg2rad = degs => Math.PI * degs / 180;

    const diagonal = 100;
    const offset = 2;

    const center = cube.pixels(hexagon, diagonal / 2);

    const startAng = deg2rad(90);
    const radius = diagonal / 2;

    let points = []
    for (let i = 0; i < 6; i++) {
      const ang = startAng + (i * centerAng);
      const x = (offset / 2) + center.x + (radius * Math.cos(ang));
      const y = (offset / 1.5) + center.y - (radius * Math.sin(ang));
      points.push([x, y]);
    }

    points = points.map(point => point.map(round));

    const fill = hexagon.isSelected ? "yellow" : "#6dd254";

    return (
      <polygon onClick={this.selectHexagon} stroke="#555555" fill={fill} points={points} />
    );
  }
}

const mapStateToProps = (state, { x, y, z}) => {
  return {
    hexagon: select("hexagons")
      .from(state)
      .byGrid(x, y, z),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectHexagon: id => dispatch(actions.selectHexagon(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Hexagon);

