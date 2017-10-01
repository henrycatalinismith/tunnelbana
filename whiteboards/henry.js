import uuid from "uuid/v1";
import { start } from "../index";
import { getConnection } from "../reducers/connections";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.createElement("div");
  document.body.appendChild(app);

  const options = { element: app };
  start(options, (store, actions) => {
    store.dispatch(
      actions.addLine({
        id: "Circle",
        color: "yellow"
      })
    );

    store.dispatch(
      actions.addLine({
        id: "Riverside",
        color: "#0273ff"
      })
    );

    store.dispatch(
      actions.addLine({
        id: "Polar",
        color: "#ff0000"
      })
    );

    store.dispatch(
      actions.addLine({
        id: "Hogwarts",
        color: "#ff00ff"
      })
    );
    const π = Math.PI;
    const points = ({ x, y }, r, n) => {
      const angle = 2 * π / n;

      return [...Array(n)].map((_, i) => ({
        x: x + r * Math.cos(angle * i),
        y: y + r * Math.sin(angle * i)
      }));
    };

    const center = { x: 300, y: 300 };
    let firstId = null,
      lastId = null,
      blue1 = null,
      blue2 = null;

    const links = [
      { lineId: "Riverside", from: 0, to: 5 },
      { lineId: "Polar", from: 2, to: 7 },
      { lineId: "Hogwarts", from: 4, to: 8 }
    ];

    points(center, 250, 10).map((point, i) => {
      let id = uuid();
      store.dispatch(
        actions.addStation({
          id: id,
          x: point.x,
          y: point.y
        })
      );

      if (lastId) {
        store.dispatch(
          actions.addConnection({
            id: uuid(),
            sourceId: lastId,
            destinationId: id,
            lineId: "Circle"
          })
        );
      }
      if (i === 9) {
        store.dispatch(
          actions.addConnection({
            id: uuid(),
            sourceId: id,
            destinationId: firstId,
            lineId: "Circle"
          })
        );
      }

      if (firstId === null) {
        firstId = id;
      }

      for (let link of links) {
        if (link.from === i) {
          link.fromId = id;
        } else if (link.to === i) {
          link.toId = id;
        }
      }

      if (i === 0) blue1 = id;
      if (i === 5) blue2 = id;
      lastId = id;
    });

    for (let link of links) {
      store.dispatch(
        actions.addConnection({
          id: uuid(),
          sourceId: link.fromId,
          destinationId: link.toId,
          lineId: link.lineId
        })
      );
    }

    store.dispatch(
      actions.addTrain({
        id: "Henry",
        stationId: links[1].fromId,
        lineId: links[1].lineId
      })
    );

    store.dispatch(
      actions.addTrain({
        id: "Dave",
        stationId: links[2].fromId,
        lineId: links[2].lineId
      })
    );

    store.dispatch(
      actions.addTrain({
        id: "Gordon",
        stationId: lastId,
        lineId: "Circle"
      })
    );

    store.dispatch(
      actions.addTrain({
        id: "Thomas",
        stationId: blue1,
        lineId: "Riverside"
      })
    );

    store.dispatch(
      actions.departure({
        trainId: "Henry",
        destinationId: links[1].toId
      })
    );

    store.dispatch(
      actions.departure({
        trainId: "Dave",
        destinationId: links[2].toId
      })
    );

    store.dispatch(
      actions.departure({
        trainId: "Gordon",
        destinationId: firstId
      })
    );

    store.dispatch(
      actions.departure({
        trainId: "Thomas",
        destinationId: blue2
      })
    );

    store.dispatch(
      actions.addPassenger({
        id: uuid(),
        stationId: blue1
      })
    );
  });
});
