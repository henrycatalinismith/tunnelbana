import { start } from "../index";
import uuid from "uuid/v1";

document.addEventListener("DOMContentLoaded", () => {
  const engineRoot = document.createElement("div");
  document.body.appendChild(engineRoot);
  const options = { element: engineRoot };

  start(options, game => {
    game.dispatch.createLine({
      id: "Circle",
      color: "yellow"
    });

    game.dispatch.createLine({
      id: "Riverside",
      color: "#0273ff"
    });

    game.dispatch.createLine({
      id: "Polar",
      color: "#ff0000"
    });

    game.dispatch.createLine({
      id: "Hogwarts",
      color: "#ff00ff"
    });
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
      game.dispatch.createStation({
        id: id,
        x: point.x,
        y: point.y
      });

      if (lastId) {
        game.dispatch.createConnection({
          sourceId: lastId,
          destinationId: id,
          lineId: "Circle"
        });
      }
      if (i === 9) {
        game.dispatch.createConnection({
          sourceId: id,
          destinationId: firstId,
          lineId: "Circle"
        });
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
      game.dispatch.createConnection({
        sourceId: link.fromId,
        destinationId: link.toId,
        lineId: link.lineId
      });
    }

    game.dispatch.createTrain({
      id: "Henry",
      stationId: links[1].fromId,
      lineId: links[1].lineId
    });

    game.dispatch.createTrain({
      id: "Henry2",
      stationId: links[1].toId,
      lineId: links[1].lineId
    });

    game.dispatch.createTrain({
      id: "Dave",
      stationId: links[2].fromId,
      lineId: links[2].lineId
    });

    game.dispatch.createTrain({
      id: "Dave2",
      stationId: links[2].toId,
      lineId: links[2].lineId
    });

    game.dispatch.createTrain({
      id: "Gordon",
      stationId: lastId,
      lineId: "Circle"
    });

    game.dispatch.createTrain({
      id: "Gordon2",
      stationId: firstId,
      lineId: "Circle"
    });

    game.dispatch.createTrain({
      id: "Thomas",
      stationId: blue1,
      lineId: "Riverside"
    });

    game.dispatch.createTrain({
      id: "Thomas2",
      stationId: blue1,
      lineId: "Riverside"
    });

    game.dispatch.departure({
      trainId: "Henry",
      destinationId: links[1].toId
    });

    game.dispatch.departure({
      trainId: "Henry2",
      destinationId: links[1].fromId
    });

    game.dispatch.departure({
      trainId: "Dave",
      destinationId: links[2].toId
    });

    game.dispatch.departure({
      trainId: "Dave2",
      destinationId: links[2].fromId
    });

    game.dispatch.departure({
      trainId: "Gordon",
      destinationId: firstId
    });

    game.dispatch.departure({
      trainId: "Thomas",
      destinationId: blue2
    });

    setTimeout(() => {
      game.dispatch.departure({
        trainId: "Thomas2",
        destinationId: blue2
      });
    }, 100);

    setTimeout(() => {
      game.dispatch.departure({
        trainId: "Gordon2",
        destinationId: lastId
      });
    }, 100);

    game.dispatch.createPassenger({
      stationId: blue1,
      genderId: "square"
    });
  });
});
