const { createSelectors } = require("../createSelectors");

describe("createSelectors", () => {
  it("creates a selector", () => {
    const select = createSelectors({
      example: {
        byId (state, id) {
          return state[id];
        }
      }
    });

    const state = { example: { 123: "hello" } };
    const value = select("example").from(state).byId(123);

    expect(value).toBe("hello");
  });
});
