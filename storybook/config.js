// SUT
import * as WF from '../src/main';

// This is a global stylesheet
import '!style-loader!css-loader!sass-loader!../src/style.g.scss';

import './example.css';

import { configure } from '@storybook/html';

function loadStories() {

  WF.registerBanner([]);
  WF.registerButton();
  WF.registerSurface();

  WF.registerMenu();
  WF.registerMultiSelect();

  require('../src/multiselect/multiselect.story');
  require('../src/banner/banner.story');
  require('../src/button/Button.story')
  require('../src/menu/Menu.story');
  require('../src/surface/Surface.story');
}

configure(loadStories, module);
