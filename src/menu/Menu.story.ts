import { storiesOf } from '@storybook/html';

import notes from './Menu.md';

import './stories/MenuEx.1.story';

storiesOf('Menu', module)
  .addParameters({ notes })
  .add('Basic', () => {
    return document.createElement('wf-menu-demo-1');
  });
