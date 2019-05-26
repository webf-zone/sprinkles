// SUT
import * as WF from '../src/main';

import { configure } from '@storybook/html';

function loadStories() {

  WF.registerBanner([]);
  WF.registerMultiSelect();
  WF.registerSurface();

  require('../src/multiselect/multiselect.story');
  require('../src/banner/banner.story');
  require('../src/surface/Surface.story');
}

configure(loadStories, module);
