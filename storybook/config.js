// SUT
import '../src/multiselect/multiselect';


import { configure } from '@storybook/html';

function loadStories() {
  require('../src/multiselect/multiselect.story');
}

configure(loadStories, module);
