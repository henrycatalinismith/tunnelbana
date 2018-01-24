const React = require("react");
const PropTypes = require("prop-types");
const { connect } = require("react-redux");

const select = require("../reducers").selectors;

export class Hexagon extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    hexagon: PropTypes.object
  };

  render() {
    const { hexagon } = this.props;

    const centerAng = 2 * Math.PI / 6;
    const round = n => Number(n.toFixed(3));
    const deg2rad = degs => Math.PI * degs / 180;

    const diagonal = 100;
    const offset = 2;

    const center = { x: 200, y: 100 };

    const startAng = deg2rad(90);
    const radius = diagonal / 2;

    let points = []
    for (let i = 0; i < 6; i++) {
      const ang = startAng + (i * centerAng);
      const x = (offset / 2) + hexagon.x + (radius * Math.cos(ang));
      const y = (offset / 1.5) + hexagon.y - (radius * Math.sin(ang));
      points.push([x, y]);
    }

    points = points.map(point => point.map(round));

    return (
      <polygon points={points} />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    hexagon: select("hexagons")
      .from(state)
      .byId(ownProps.id),
  };
};

export default connect(mapStateToProps)(Hexagon);

