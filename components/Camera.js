const React = require("react");
const PropTypes = require("prop-types");
const { connect } = require("react-redux");
const select = require("../reducers").selectors;
const Hexagon = require("./Hexagon").default;

export class Camera extends React.PureComponent {
  static propTypes = {
    actors: PropTypes.object,
    hexagons: PropTypes.array,
    viewport: PropTypes.object,
  };

  render() {
    const { actors, hexagons, viewport } = this.props;

    const viewbox = [
      0 - (viewport.width / 2),
      0 - (viewport.height / 2),
      viewport.width,
      viewport.height
    ].join(" ");

    return (
      <svg draggable="false" viewBox={viewbox}>
        {hexagons.map((hexagon, i) => {
          return <Hexagon key={hexagon.id} id={hexagon.id} />;
        })}
      </svg>
    );
  }
}

const mapStateToProps = state => {
  const camera = select("camera").from(state).all();
  return {
    actors: select("actors")
      .from(state)
      .all(),
    hexagons: select("hexagons")
      .from(state)
      .byCell(camera.cellId),
    viewport: select("viewport")
      .from(state)
      .dimensions(),
  };
};

export default connect(mapStateToProps)(Camera);

