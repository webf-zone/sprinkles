import { storiesOf } from '@storybook/html';

import notes from './Surface.md';

import './stories/Story1';

storiesOf('Surface', module)
  .addParameters({ notes })
  .add('Basic', () => {
    return document.createElement('wf-surface-demo-1');
  });
