import { createMiddleware } from "signalbox";
import uuid from "uuid/v1";
import actions from "../actions";
import { select } from "../reducers";
import * as points from "../geometry/points";

const path = (source, destination) => {
  const π = Math.PI;
  const angle = Math.abs(points.angle(source, destination));

  let type = undefined;
  if (angle > π / 4 && angle < 3 / 4 * π) {
    type = "latitudinal"; // northerly track
  } else if (angle > 3 / 4 * π && angle < 5 / 4 * π) {
    type = "longitudinal"; // westerly track
  } else if (angle > 5 / 4 * π && angle < 7 / 4 * π) {
    type = "latitudinal"; // southerly track
  } else {
    type = "longitudinal"; // easterly track
  }

  let primaryDistance;
  let secondaryDistance;
  if (type === "latitudinal") {
    primaryDistance = source.y - destination.y;
    secondaryDistance = source.x - destination.x;
  } else {
    primaryDistance = source.x - destination.x;
    secondaryDistance = source.y - destination.y;
  }
  primaryDistance = Math.abs(primaryDistance);
  secondaryDistance = Math.abs(secondaryDistance);
  const remainder = primaryDistance - secondaryDistance;

  const tracks = [];

  if (Math.abs(secondaryDistance) < 0.000001) {
    tracks.push([
      { x: source.x, y: source.y },
      { x: destination.x, y: destination.y }
    ]);
  } else {
    let p1, p2;

    const createTrack = (p1, p2, sourceId, destinationId, ordinality) => {
      store.dispatch(
        actions.createTrack({
          connectionId: connection.id,
          lineId,
          sourceId,
          destinationId,
          ordinality,
          x1: p1.x,
          y1: p1.y,
          x2: p2.x,
          y2: p2.y
        })
      );
    };

    let a, b;
    if (type === "latitudinal") {
      a = { x: source.x, y: source.y };
      b = { x: destination.x, y: destination.y };
      a.y += source.y < destination.y ? remainder / 2 : 0 - remainder / 2;
      b.y += source.y > destination.y ? remainder / 2 : 0 - remainder / 2;

      if (source.x !== a.x || source.y !== a.y) {
        tracks.push([{ x: source.x, y: source.y }, a]);
      }
      tracks.push([a, b]);
      if (destination.x !== b.x || destination.y !== b.y) {
        tracks.push([b, { x: destination.x, y: destination.y }]);
      }
    }

    if (type === "longitudinal") {
      a = { x: source.x, y: source.y };
      b = { x: destination.x, y: destination.y };
      a.x += source.x < destination.x ? remainder / 2 : 0 - remainder / 2;
      b.x += source.x > destination.x ? remainder / 2 : 0 - remainder / 2;

      if (source.x !== a.x || source.y !== a.y) {
        tracks.push([{ x: source.x, y: source.y }, a]);
      }
      tracks.push([a, b]);
      if (destination.x !== b.x || destination.y !== b.y) {
        tracks.push([b, { x: destination.x, y: destination.y }]);
      }
    }
  }

  return tracks;
};

export const middleware = createMiddleware((before, after, cancel) => ({
  [before(actions.CREATE_TRACK)]: function inferTrackProperties(store, action) {
    if (!action.track.id) {
      action.track.id = uuid();
    }
  },

  [after(actions.CREATE_CONNECTION)]: function createTracksForNewConnetion(
    store,
    action
  ) {
    const { connection, line } = action;
    const state = store.getState();
    const connections = store.getState().get("connections");
    const stations = store.getState().get("stations");

    if (!action.destination.id) {
      return;
    }

    const source = select("stations")
      .from(state)
      .byId(action.source.id)
      .toJS();

    const destination = select("stations")
      .from(state)
      .byId(action.destination.id)
      .toJS();

    const createTrack = (p1, p2, ordinality) => {
      store.dispatch(
        actions.createTrack({
          connectionId: connection.id,
          lineId: line.id,
          sourceId: source.id,
          destinationId: destination.id,
          ordinality,
          x1: p1.x,
          y1: p1.y,
          x2: p2.x,
          y2: p2.y
        })
      );
    };

    const tracks = path(source, destination);
    tracks.forEach((track, i) => {
      createTrack(track[0], track[1], i);
    });
  },

  [before(actions.DRAG_TERMINAL)]: function moveTracksForMovedTerminal(
    store,
    action
  ) {
    const state = store.getState();

    const terminal = select("terminals")
      .from(state)
      .byId(action.terminal.id)
      .toJS();

    const lineId = terminal.lineId;
    const connection = select("connections")
      .from(state)
      .imaginary()
      .toJS();

    const sourceId = connection.sourceId;
    const source = select("stations")
      .from(state)
      .byId(connection.sourceId)
      .toJS();

    const tracks = select("tracks")
      .from(state)
      .byConnectionId(connection.id)
      .toJS();

    action.connection = connection;
    action.tracks = {};

    const newTracks = path(source, action.terminal);
    newTracks.forEach((newTrack, i) => {
      if (tracks[i]) {
        const trackId = tracks[i].id;
        action.tracks[trackId] = {
          ...tracks[i],
          connectionId: connection.id,
          lineId,
          sourceId,
          ordinality: i,
          destinationId: undefined,
          x1: newTrack[0].x,
          y1: newTrack[0].y,
          x2: newTrack[1].x,
          y2: newTrack[1].y
        };
      } else {
        // i already forgot when this happens sorry
        const trackId = uuid();
        action.tracks[trackId] = {
          id: trackId,
          connectionId: connection.id,
          lineId,
          sourceId,
          destinationId: undefined,
          x1: newTrack[0].x,
          y1: newTrack[0].y,
          x2: newTrack[1].x,
          y2: newTrack[1].y
        };
      }
    });
  },

  [before(
    actions.REALIZE_CONNECTION
  )]: function fixNewTracksForRealizedConnection(store, action) {
    const state = store.getState();

    const connection = select("connections")
      .from(state)
      .imaginary()
      .toJS();
    const source = select("stations")
      .from(state)
      .byId(connection.sourceId)
      .toJS();
    const destination = select("stations")
      .from(state)
      .byId(action.destination.id)
      .toJS();

    const tracks = select("tracks")
      .from(state)
      .byConnectionId(connection.id)
      .toJS();

    const newTracks = path(source, destination);
    console.log(newTracks.length, tracks.length);

    action.tracks = {};
    newTracks.forEach((newTrack, i) => {
      if (tracks[i]) {
        const trackId = tracks[i].id;
        action.tracks[trackId] = {
          ...tracks[i],
          destinationId: action.destination.id,
          x1: newTrack[0].x,
          y1: newTrack[0].y,
          x2: newTrack[1].x,
          y2: newTrack[1].y
        };
      } else {
        // i already forgot when this happens sorry
        const trackId = uuid();
        action.tracks[trackId] = {
          destinationId: action.destination.id,
          x1: newTrack[0].x,
          y1: newTrack[0].y,
          x2: newTrack[1].x,
          y2: newTrack[1].y
        };
      }
    });
  }
}));
