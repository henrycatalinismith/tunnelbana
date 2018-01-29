const { createActions } = require("../createActions");

describe("createActions", () => {
  it("converts the listed action types into properties", () => {
    const actions = createActions(["DELETE_MESSAGE"]);
    expect(actions.DELETE_MESSAGE).toBe("DELETE_MESSAGE");
  });

  it("passes the action types to the callback", () => {
    createActions(["DELETE_MESSAGE"], types => {
      expect(types.DELETE_MESSAGE).toBe("DELETE_MESSAGE");
    });
  });

  it("stores any action creators returned by the callback", () => {
    const actions = createActions(["DELETE_MESSAGE"], types => ({
      deleteMessage: () => ({ type: types.DELETE_MESSAGE })
    }));
    expect(actions.deleteMessage().type).toBe("DELETE_MESSAGE");
  });
});

