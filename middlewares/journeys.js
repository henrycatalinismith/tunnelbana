import uuid from 'uuid/v1';
import {TweenMax, TweenLite, Power2, TimelineLite, TimelineMax, Power4, Linear } from 'gsap';
import actions from '../actions';
import { select } from '../reducers';
import { train } from '../reducers/trains';
import clock from '../clock';
import * as points from '../geometry/points';

export default function(store) {
  return next => action => {
    let state;
    let train, source, destination, line, journey;
    const n = next(action);

    switch (action.type) {
      case actions.DEPARTURE:
        state = store.getState();
        train = select('trains').from(state).byId(action.journey.trainId).toJS();
        source = select('stations').from(state).byId(action.journey.sourceId).toJS();
        destination = select('stations').from(state).byId(action.journey.destinationId).toJS();
        line = select('lines').from(state).byId(action.journey.lineId);
        journey = select('journeys').from(state).byId(train.journeyId).toJS();
        const tracks = select('tracks').from(state).forJourney(action.journey);

        const width = 15;
        const height = 30;
        const halfTrain = { x: 0 - height / 2, y: 0 - width / 2 };
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
          TweenLite.to(`#${train.id}`, 0.1, {
            rotation: degrees,
            svgOrigin: `${source.x} ${source.y}`,
          });
          TweenLite.fromTo(`#${train.id}`, time / 1000, from, to);
        } else {

          const tl = new TimelineMax();
          let prevAngle = 0;
          let turnAngle;

          tracks.forEach((track, i) => {
            from = points.add({ x: track.get('x1'), y: track.get('y1') }, halfTrain)
            to = points.add({ x: track.get('x2'), y: track.get('y2') }, halfTrain);

            angle = points.angle(from,to);
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
            if (needsTurn) {
              tl.to(`#${train.id}`, 0.01, {
                rotation: degrees,
              });
            }
            tl.fromTo(`#${train.id}`, time / 1000 / 3, from, {
              ...to,
              ease: Linear.easeNone
            });
            prevAngle = degrees;
          });

          tl.play();

            /*
          from = points.add({ x: tracks[0].x1, y: tracks[0].y1 }, halfTrain)
          to = points.add({ x: tracks[0].x2, y: tracks[0].y2 }, halfTrain);
          angle = points.angle(from,to);
          degrees = angle * 180 / Math.PI;
          tl.to(`#${train.id}`, 0, points.add(from, halfTrain));
          tl.to(`#${train.id}`, 0.1, {
            rotation: degrees,
          });
          tl.fromTo(`#${train.id}`, time / 1000 / 3, from, { ...to, ease: Power4.easeOut });
          prevAngle = angle;

          from = points.add({ x: tracks[1].x1, y: tracks[1].y1 }, halfTrain);
          to = points.add({ x: tracks[1].x2, y: tracks[1].y2 }, halfTrain);
          angle = points.angle(to, from);
          turnAngle = (angle - prevAngle) * 180 / Math.PI;
          degrees = angle * 180 / Math.PI;
          tl.to(`#${train.id}`, 0.1, {
            rotation: degrees,
            svgOrigin: `${from.x} ${from.y}`,
          });
          tl.fromTo(`#${train.id}`, time / 1000 / 3, from, { ...to, ease: Power4.easeOut });

          from = points.add({ x: tracks[2].x1, y: tracks[2].y1 }, halfTrain);
          to = points.add({ x: tracks[2].x2, y: tracks[2].y2 }, halfTrain);
          angle = points.angle(to, from);
          degrees = angle * 180 / Math.PI;
          tl.to(`#${train.id}`, 0.1, {
            rotation: degrees,
            svgOrigin: `${from.x} ${from.y}`,
          });
          tl.fromTo(`#${train.id}`, time / 1000 / 3, from, { ...to, ease: Power4.easeOut });
          */

          //TweenLite.fromTo(`#${train.id}`, time / 1000, from, to);
        }

        clock.setTimeout(() => {
          store.dispatch(actions.arrival({
            id: journey.id,
            destinationId: destination.id,
            lineId: line.get('id'),
            sourceId: source.id,
            trainId: train.id,
          }));
        }, time );
        break;

      case actions.ARRIVAL:
        state = store.getState();
        const {
          connectionId,
          destinationId
        } = select('connections').from(state).forNextStop(
          action.journey.sourceId,
          action.journey.destinationId,
          action.journey.lineId
        );

        clock.setTimeout(() => {
          store.dispatch(actions.departure({
            id: uuid(),
            sourceId: action.journey.destinationId,
            destinationId: destinationId,
            connectionId: connectionId,
            trainId: action.journey.trainId,
            lineId: action.journey.lineId,
          }));
        }, 300);
        break;
    }

    return n;
  }
}
