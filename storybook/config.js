// SUT
import '../src/multiselect/multiselect';
import '../src/banner/banner.story';


import { configure } from '@storybook/html';

function loadStories() {
  require('../src/multiselect/multiselect.story');
  require('../src/banner/banner');
}

configure(loadStories, module);
