const React = require("react");
const ReactDOM = require("react-dom");
const HighValley = require("../components").default;

document.addEventListener("DOMContentLoaded", () => {
  const root = document.createElement("div");
  document.body.appendChild(root);
  ReactDOM.render(<HighValley />, root);
});

