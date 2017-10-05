import { start } from "../index";
import uuid from "uuid/v1";

document.addEventListener("DOMContentLoaded", () => {
  const engineRoot = document.createElement("div");
  document.body.appendChild(engineRoot);
  const options = { element: engineRoot };

  start(options, game => {
    game.dispatch.createLine({
      id: "Riverside",
      color: "#0273ff"
    });

    game.dispatch.createStation({
      id: "one",
      x: 100,
      y: 100
    });

    game.dispatch.createStation({
      id: "two",
      x: 200,
      y: 100
    });
  });
});
