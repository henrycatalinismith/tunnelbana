const React = require("react");
const PropTypes = require("prop-types");

const grass = require("./grass");
const water = require("./water");
const forest = require("./forest");
const city = require("./city");

const components = {
  grass: grass.Grass,
  water: water.Water,
  forest: forest.Forest,
  city: city.City,
};

const terrains = {
  grass: grass.terrain,
  water: water.terrain,
  forest: forest.terrain,
  city: city.terrain,
};

export default class Terrain extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
  };

  render() {
    const { id } = this.props;

    if (typeof components[id] === "undefined") {
      console.error(`terrains/index: unable to render nonexistent terrain ${id}`);
      return;
    }
    const TerrainType = components[id];

    return <TerrainType />;
  }
}

