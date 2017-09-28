import actions from "../actions";
import * as dragon from "./dragon";
import * as journeys from "./journeys";
import * as passengers from "./passengers";
import * as terminals from "./terminals";
import * as tracks from "./tracks";

const createMiddleware = cb => {
  const befores = {};
  const afters = {};

  const middleware = store => {
    return next => action => {
      befores[action.type] &&
        befores[action.type].forEach(before => {
          before.call(null, store, action);
        });

      const result = next(action);

      afters[action.type] &&
        afters[action.type].forEach(after => {
          after.call(null, store, action);
        });

      return result;
    };
  };

  const addBefore = actionType => {
    (befores[actionType] = befores[actionType] || []).push(undefined);
    return `before.${actionType}.${befores[actionType].length}`;
  };
  const addAfter = actionType => {
    (afters[actionType] = afters[actionType] || []).push(undefined);
    return `after.${actionType}.${afters[actionType].length}`;
  };

  const middlewares = cb.call(null, addBefore, addAfter);

  Object.keys(middlewares).forEach(key => {
    const [, timing, actionType, index] = key.match(
      /^(before|after)\.(.*)+\.(\d+)$/
    );
    ({ before: befores, after: afters }[timing][actionType][index - 1] =
      middlewares[key]);
  });

  return [middleware];
};

const middleware = createMiddleware((before, after) => ({
  [before(actions.DRAGON_MOVE)]: dragon.injectEntity,
  [after(actions.ADD_CONNECTION)]: tracks.addTracks,
  [after(actions.ADD_CONNECTION)]: terminals.addTerminal,

  [after(actions.DEPARTURE)]: journeys.animateJourney,
  [after(actions.ARRIVAL)]: passengers.alightTrains,
  [after(actions.ARRIVAL)]: passengers.boardTrains,
  [after(actions.ARRIVAL)]: journeys.scheduleDeparture
}));

export default middleware;
