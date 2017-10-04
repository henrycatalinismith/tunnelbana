import { start } from "../index";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.createElement("div");
  document.body.appendChild(app);

  const options = { element: app };
  start(options, game => {
    game.dispatch.addLine({
      id: "Riverside",
      color: "#0273ff"
    });

    game.dispatch.addStation({
      id: "one",
      x: 100,
      y: 100
    });

    game.dispatch.addStation({
      id: "two",
      x: 200,
      y: 100
    });

    game.dispatch.addStation({
      id: "three",
      x: 150,
      y: 500
    });

    game.dispatch.addConnection({
      sourceId: "one",
      destinationId: "two",
      lineId: "Riverside"
    });

    game.dispatch.addConnection({
      sourceId: "two",
      destinationId: "three",
      lineId: "Riverside"
    });

    //game.dispatch.addTrain({
    //id: "Henry",
    //stationId: "one",
    //lineId: "Riverside"
    //});

    //game.dispatch.departure({
    //trainId: "Henry",
    //destinationId: "two"
    //});

    //game.dispatch.windowResize({
    //width: 300,
    //height: 300
    //});
  });
});
