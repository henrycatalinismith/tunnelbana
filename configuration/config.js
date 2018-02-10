const { configure } = require("@storybook/react");
const { setDefaults } = require("react-storybook-addon-props-combinations");
require("@storybook/addon-console");

setDefaults({ showSource: false });

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
