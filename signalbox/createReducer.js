exports.createReducer = (initialState, actionHandlers) => {
  const reducer = (state, action) => {
    if (state === undefined) {
      state = initialState;
    }
    if (actionHandlers.hasOwnProperty(action.type)) {
      state = actionHandlers[action.type](state, action);
    }
    return state;
  };

  return reducer;
};
