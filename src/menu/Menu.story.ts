import { storiesOf } from '@storybook/html';

import notes from './Menu.md';

import { MenuDemo1 } from './stories/MenuEx.1.story';
import { MenuDemo2 } from './stories/MenuEx.2.story';

storiesOf('Menu', module)
  .addParameters({ notes })
  .add('Basic', () => {
    return new MenuDemo1();
  })
  .add('Scroll behavior', () => {
    return new MenuDemo2();
  });
