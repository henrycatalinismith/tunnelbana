const { createMiddleware } = require("signalbox");
const { TweenLite } = require("gsap");
const { Power2 } = require("gsap");

const uuid = require("uuid/v1");

const cube = require("../geometry/cube").default;
const actions = require("../actions").default;
const select = require("../reducers/selectors").default;

export const middleware = createMiddleware((cancel, before, after) => ({
  [before(actions.SELECT_HEXAGON)](store, action) {
    const state = store.getState();
    const camera = select("cameras").from(state).byId("main").toJS();
    const hexagon = select("hexagons").from(state).byId(action.hexagon.id).toJS();
    const viewport = select("viewport").from(state).dimensions().toJS();

    const point = cube.pixels(hexagon, 50);
    const width = viewport.width * camera.zoom;
    const height = viewport.height * camera.zoom;
    const x = 0 - (width / 2) + (point.x * 1);
    const y = 0 - (height / 2) + (point.y * 1);
    const viewBox = [x, y, width, height].join(" ");

    action.camera = {
      x: point.x,
      y: point.y,
    };

    TweenLite.to('svg', 1, { attr: { viewBox }, ease: Power2.easeOut });
  }
}));

export default middleware;


