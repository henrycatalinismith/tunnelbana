describe("createApp", () => {
  let createApp;
  let mockStore = { dispatch: jest.fn() };
  let mockSelectors = { bindStore: jest.fn() };
  let mockBindActionCreators;

  beforeEach(() => {
    mockBindActionCreators = jest.fn(actions => Object.assign(actions, { bound: true }));
    jest.mock("redux", () => ({
      bindActionCreators: mockBindActionCreators
    }));
    createApp = require("../createApp").createApp;
  });

  it("puts action types in the actions property", () => {
    const actions = { DELETE_MESSAGE: "DELETE_MESSAGE" };
    const app = createApp(mockStore, actions, [], mockSelectors);
    expect(app.actions).toEqual({
      DELETE_MESSAGE: "DELETE_MESSAGE"
    });
  });

  it("bins action creators in the dispatch property", () => {
    const actions = { deleteMessage: () => {} };
    const app = createApp(mockStore, actions, [], mockSelectors);
    expect(app.dispatch).toEqual(expect.objectContaining({
      bound: true,
    }));
    expect(app.dispatch).toEqual(expect.objectContaining(actions));
  });
});
