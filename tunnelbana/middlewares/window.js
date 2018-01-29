import { createMiddleware } from "signalbox";
import actions from "../actions";
import { select } from "../reducers";

export const middleware = createMiddleware((cancel, before, after) => ({
  [after(actions.START)](store) {
    store.dispatch(actions.resizeWindow(window.innerWidth, window.innerHeight));

    window.addEventListener("blur", () => store.dispatch(actions.blurWindow()));

    window.addEventListener("focus", () =>
      store.dispatch(actions.focusWindow())
    );

    window.addEventListener("keypress", event => {
      if (event.key === "s") {
        store.dispatch(actions.save());
      }
    });

    const pointerDown = (x, y) => {
      const target = document.elementFromPoint(x, y);
      const grandparent = target.parentElement.parentElement;
      const isStation = grandparent.classList.contains("station");
      if (isStation) {
        store.dispatch(actions.grabStation(grandparent.id));
      }
    };

    window.addEventListener("mousedown", event => {
      const x = event.clientX;
      const y = event.clientY;
      pointerDown(x, y);
    });

    window.addEventListener("touchstart", event => {
      const x = event.touches[0].clientX;
      const y = event.touches[0].clientY;
      pointerDown(x, y);
    });

    let throttle = false;
    const pointerMove = (x, y) => {
      if (!throttle) {
        const target = document.elementFromPoint(x, y);
        const grandparent = target.parentElement.parentElement;
        const isStation = grandparent.classList.contains("station");

        if (isStation) {
          const state = store.getState();
          const dragon = select("dragon")
            .from(state)
            .all()
            .toJS();
          const stationId = grandparent.id;

          if (dragon.entity === "terminal") {
            store.dispatch(
              actions.realizeConnection({ destinationId: stationId })
            );
          }
        }

        store.dispatch(actions.dragonMove(x, y));
        throttle = true;
        setTimeout(() => (throttle = false), 10);
      }
    };

    window.addEventListener("mousemove", event => {
      const x = event.clientX;
      const y = event.clientY;
      pointerMove(x, y);
    });

    window.addEventListener("touchmove", event => {
      const x = event.touches[0].clientX;
      const y = event.touches[0].clientY;
      pointerMove(x, y);
    });

    const pointerUp = () => {
      const { entity, id } = store
        .getState()
        .get("dragon")
        .toJS();
      if (entity && id) {
        store.dispatch(actions.dragonDrop(entity, id));
      }
    };

    window.addEventListener("mouseup", pointerUp);
    window.addEventListener("touchend", pointerUp);

    window.addEventListener("resize", () =>
      store.dispatch(
        actions.resizeWindow(window.innerWidth, window.innerHeight)
      )
    );
  }
}));
