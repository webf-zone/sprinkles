// SUT
import '../src/multiselect/multiselect';
import '../src/banner/banner';


import { configure } from '@storybook/html';

function loadStories() {
  require('../src/multiselect/multiselect.story');
  require('../src/banner/banner.story');
}

configure(loadStories, module);
