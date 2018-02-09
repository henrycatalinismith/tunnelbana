const { configure } = require("@storybook/react");
const { setDefaults } = require("react-storybook-addon-props-combinations");

setDefaults({ showSource: false });

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
