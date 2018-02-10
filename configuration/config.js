// Storybook's Config File
// =======================
//
// This is here under the name "config.js" because Storybook only lets you
// configure the *directory* containing its config file, not the name of the
// file itself. I wanted to keep all the config together and this weird
// ambiguous filename is a compromise I had to make to get that.

const { configure } = require("@storybook/react");
const { setDefaults } = require("react-storybook-addon-props-combinations");
require("@storybook/addon-console");

setDefaults({ showSource: false });

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
