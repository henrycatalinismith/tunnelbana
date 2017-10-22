exports.createActions = (typeList, creatorCreator) => {
  const actionTypes = {};
  typeList.forEach(type => actionTypes[type] = type);
  const actionCreators = typeof creatorCreator === "function"
    ? creatorCreator(actionTypes)
    : {};
  const actions = Object.assign({}, actionCreators, actionTypes);
  return actions;
};

