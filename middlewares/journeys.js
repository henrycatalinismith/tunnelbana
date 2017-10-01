import { createMiddleware } from "signalbox";
import uuid from "uuid/v1";
import {
  TweenMax,
  TweenLite,
  Power2,
  TimelineLite,
  TimelineMax,
  Power4,
  Linear
} from "gsap";
import actions from "../actions";
import { select } from "../reducers";
import { train } from "../reducers/trains";
import clock from "../clock";
import * as points from "../geometry/points";
import { getConnection } from "../reducers/connections";

export const middleware = createMiddleware((before, after, cancel) => ({
  [before(actions.DEPARTURE)](store, action) {
    const state = store.getState();
    const train = select("trains")
      .from(state)
      .byId(action.journey.trainId)
      .toJS();
    console.log(train);

    if (!action.journey.id) {
      action.journey.id = uuid();
    }

    if (!action.journey.lineId) {
      action.journey.lineId = train.lineId;
    }

    if (!action.journey.sourceId) {
      action.journey.sourceId = train.stationId;
    }

    if (!action.journey.connectionId) {
      action.journey.connectionId = getConnection(
        state.get("connections"),
        action.journey.lineId,
        action.journey.sourceId,
        action.journey.destinationId
      ).id;
    }

    console.log(action.journey);
  },

  [after(actions.ARRIVAL)](store, { journey }) {
    const state = store.getState();
    const { connectionId, destinationId } = select("connections")
      .from(state)
      .forNextStop(journey.sourceId, journey.destinationId, journey.lineId);

    clock.setTimeout(() => {
      store.dispatch(
        actions.departure({
          id: uuid(),
          sourceId: journey.destinationId,
          destinationId: destinationId,
          connectionId: connectionId,
          trainId: journey.trainId,
          lineId: journey.lineId
        })
      );
    }, 1000);
  },

  [after(actions.DEPARTURE)](store, { journey }) {
    const state = store.getState();

    const train = select("trains")
      .from(state)
      .byId(journey.trainId)
      .toJS();

    const source = select("stations")
      .from(state)
      .byId(journey.sourceId)
      .toJS();

    const destination = select("stations")
      .from(state)
      .byId(journey.destinationId)
      .toJS();

    const line = select("lines")
      .from(state)
      .byId(journey.lineId)
      .toJS();

    // what the hell have i done here omg this is a mess
    journey = select("journeys")
      .from(state)
      .byId(train.journeyId)
      .toJS();

    const tracks = select("tracks")
      .from(state)
      .forJourney(journey)
      .toJS();

    const width = 15;
    const height = 30;
    //const halfTrain = { x: 0 - height / 2, y: 0 - width / 2 };
    const halfTrain = { x: 0, y: 0 };
    let from = points.add(source, halfTrain);
    let to = points.add(destination, halfTrain);

    const speed = 0.1;
    const distance = points.distance(from, to);
    const time = distance / speed;
    let angle = points.angle(to, from);

    const pathId = `#connection-${source.id}-${destination.id}-${line.id}`;
    const path = document.querySelector(pathId);
    let degrees = angle * 180 / Math.PI;

    if (tracks.length === 1) {
      //TweenLite.to(`#${train.id}`, 0.1, {
      //rotation: degrees,
      //svgOrigin: `${source.x} ${source.y}`
      //});
      TweenLite.fromTo(`#${train.id}`, time / 1000, from, to);
    } else {
      let prevAngle = 0;
      let turnAngle;
      const tweens = [];
      let i = 0;

      for (let track of tracks) {
        from = points.add({ x: track.x1, y: track.y1 }, halfTrain);
        to = points.add({ x: track.x2, y: track.y2 }, halfTrain);

        angle = points.angle(from, to);
        degrees = angle * 180 / Math.PI;
        turnAngle = prevAngle - degrees;

        if (turnAngle < 0) {
          turnAngle += 360;
        }
        if (degrees < 0) {
          degrees += 360;
        }
        // this is literally a special magic property of trains that they
        // can go forwards or backwards and it's just fine
        if (degrees === 180) {
          degrees = 0;
        }
        const needsTurn = turnAngle !== 180;

        //tl.to(`#${train.id}`, 0.001, points.add(from, halfTrain));
        //tweens.push(
        //TweenMax.to(`#${train.id}`, 0.01, {
        //rotation: degrees,
        //delay: time / 1000 / 3 * i
        //})
        //);
        tweens.push(
          TweenMax.fromTo(`#${train.id}`, time / 1000 / 3, from, {
            ...to,
            ease: Linear.easeNone,
            delay: time / 1000 / 3 * i
          })
        );
        prevAngle = degrees;
        i++;
      }

      const tl = new TimelineMax({ tweens });
      tl.play();
    }

    clock.setTimeout(() => {
      store.dispatch(
        actions.arrival({
          id: journey.id,
          destinationId: destination.id,
          lineId: line.id,
          sourceId: source.id,
          trainId: train.id
        })
      );
    }, time);
  }
}));
