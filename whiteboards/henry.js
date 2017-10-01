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

    store.dispatch(
      actions.addTrain({
        id: "Thomas",
        stationId: "Kungstradgarden",
        lineId: "Riverside"
      })
    );

    store.dispatch(
      actions.addTrain({
        id: "Gordon",
        stationId: "Kungstradgarden",
        lineId: "Circle"
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
      actions.departure({
        id: uuid(),
        trainId: "Gordon",
        sourceId: lastId,
        destinationId: firstId,
        lineId: "Circle",
        connectionId: getConnection(
          store.getState().get("connections"),
          "Circle",
          lastId,
          firstId
        ).id
      })
    );

    store.dispatch(
      actions.addTrain({
        id: "Henry",
        stationId: links[0].fromId,
        lineId: "Polar"
      })
    );

    store.dispatch(
      actions.addTrain({
        id: "Dave",
        stationId: links[2].fromID,
        lineId: "Hogwarts"
      })
    );

    store.dispatch(
      actions.departure({
        id: uuid(),
        trainId: "Henry",
        sourceId: links[1].fromId,
        destinationId: links[1].toId,
        lineId: links[1].lineId,
        connectionId: getConnection(
          store.getState().get("connections"),
          links[1].lineId,
          links[1].fromId,
          links[1].toId
        ).id
      })
    );

    store.dispatch(
      actions.departure({
        id: uuid(),
        trainId: "Dave",
        sourceId: links[2].fromId,
        destinationId: links[2].toId,
        lineId: links[2].lineId,
        connectionId: getConnection(
          store.getState().get("connections"),
          links[2].lineId,
          links[2].fromId,
          links[2].toId
        ).id
      })
    );

    store.dispatch(
      actions.departure({
        id: uuid(),
        trainId: "Thomas",
        sourceId: blue1,
        destinationId: blue2,
        lineId: "Riverside",
        connectionId: getConnection(
          store.getState().get("connections"),
          "Riverside",
          blue1,
          blue2
        ).id
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
