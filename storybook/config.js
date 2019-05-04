// SUT

import {registerBanner,registerExplorer, registerMultiSelect } from '../src/main';

import { configure } from '@storybook/html';

registerBanner([]);
registerExplorer([]);
registerMultiSelect();

function loadStories() {
  require('../src/multiselect/multiselect.story');
  require('../src/banner/banner.story');
  require('../src/explorer/explorer.story');
}

configure(loadStories, module);
