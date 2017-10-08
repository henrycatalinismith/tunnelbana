import { createMiddleware } from "signalbox";
import actions from "../actions";

export const middleware = createMiddleware((before, after) => ({
  [after(actions.START)](store) {
    window.addEventListener("blur", () => store.dispatch(actions.blurWindow()));
    window.addEventListener("focus", () =>
      store.dispatch(actions.focusWindow())
    );
  }
}));
