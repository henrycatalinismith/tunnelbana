describe("createApp", () => {
  let createApp;
  let mockStore = { dispatch: jest.fn() };
  let mockSelectors = {
    bindStore: jest.fn((selectors, store) => {
      return Object.assign({}, selectors, { bound: true } );
    })
  };
  let mockBindActionCreators;

  beforeEach(() => {
    mockBindActionCreators = jest.fn(actions => Object.assign(actions, { bound: true }));
    jest.mock("redux", () => ({
      bindActionCreators: mockBindActionCreators
    }));
    createApp = require("../createApp").createApp;
  });

  it("puts action types on the actions property", () => {
    const actions = { DELETE_MESSAGE: "DELETE_MESSAGE" };
    const app = createApp(mockStore, actions, [], mockSelectors);
    expect(app.actions).toEqual({
      DELETE_MESSAGE: "DELETE_MESSAGE"
    });
  });

  it("binds action creators on the dispatch property", () => {
    const actions = { deleteMessage: () => {} };
    const app = createApp(mockStore, actions, [], mockSelectors);
    expect(app.dispatch).toEqual(expect.objectContaining({
      bound: true,
    }));
    expect(app.dispatch).toEqual(expect.objectContaining(actions));
  });

  it("binds selectors on the select property", () => {
    const app = createApp(mockStore, {}, [], mockSelectors);
    expect(app.select).toEqual(expect.objectContaining({
      bound: true
    }));
  });
});
