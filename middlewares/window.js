import { createMiddleware } from "signalbox";
import actions from "../actions";

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
    window.addEventListener("mousemove", event => {
      if (!throttle) {
        store.dispatch(actions.dragonMove(event.clientX, event.clientY));
        throttle = true;
        setTimeout(() => (throttle = false), 10);
      }
    });

    window.addEventListener("mouseup", event => {
      const { entity, id } = store
        .getState()
        .get("dragon")
        .toJS();
      if (entity && id) {
        store.dispatch(actions.dragonDrop(entity, id));
      }
    });

    window.addEventListener("resize", () =>
      store.dispatch(
        actions.resizeWindow(window.innerWidth, window.innerHeight)
      )
    );
  }
}));
