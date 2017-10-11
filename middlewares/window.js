import { createMiddleware } from "signalbox";
import actions from "../actions";
import { select } from "../reducers";

export const middleware = createMiddleware((before, after) => ({
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

    let throttle = false;
    const pointerMove = (x, y) => {
      if (!throttle) {
        store.dispatch(actions.dragonMove(x, y));
        throttle = true;
        setTimeout(() => (throttle = false), 10);
      }
    };

    window.addEventListener("mousemove", event =>
      pointerMove(event.clientX, event.clientY)
    );
    window.addEventListener("touchmove", event =>
      pointerMove(event.touches[0].clientX, event.touches[0].clientY)
    );

    window.addEventListener("touchmove", event => {
      const x = event.touches[0].clientX;
      const y = event.touches[0].clientY;
      const target = document.elementFromPoint(x, y);
      const isStation = target.parentElement.classList.contains("station");

      if (isStation) {
        const state = store.getState();
        const dragon = select("dragon")
          .from(state)
          .all()
          .toJS();
        const stationId = target.parentElement.id;

        if (dragon.entity === "terminal") {
          store.dispatch(
            actions.realizeConnection({ destinationId: stationId })
          );
        }
      }
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
