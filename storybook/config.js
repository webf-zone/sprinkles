import { addParameters, configure } from '@storybook/html';
import sprinkleTheme from './sprinkleTheme';

// SUT
import * as WF from '../src/main';

// This is a global stylesheet
import '!style-loader!css-loader!sass-loader!../src/style.g.scss';

import './example.css';

// Sprinkle theme
addParameters({
  options: {
    theme: sprinkleTheme
  }
});

function loadStories() {


  WF.registerBanner([]);
  WF.registerButton();
  WF.registerDialog();
  WF.registerSurface();
  WF.registerSurfaceRipple();

  WF.registerMenu();
  WF.registerMultiSelect();

  require('../src/multiselect/multiselect.story');
  require('../src/banner/banner.story');
  require('../src/button/Button.story');
  require('../src/dialog/Dialog.story');
  require('../src/effects/ripple/Ripple.story');
  require('../src/menu/Menu.story');
  require('../src/surface/Surface.story');
}

configure(loadStories, module);
