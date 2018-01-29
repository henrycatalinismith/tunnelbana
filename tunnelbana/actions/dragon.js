import { createActions } from "signalbox";

export const actions = createActions(
  ["DRAGON_DROP", "DRAGON_GRAB", "DRAGON_MOVE"],
  types => ({
    dragonDrop: (entity, id) => {
      return {
        type: types.DRAGON_DROP,
        dragon: { entity, id }
      };
    },

    dragonGrab: (entity, id) => {
      return {
        type: types.DRAGON_DROP,
        dragon: { entity, id }
      };
    },

    dragonMove: (x, y) => {
      return {
        type: types.DRAGON_MOVE,
        dragon: { x, y }
      };
    }
  })
);
