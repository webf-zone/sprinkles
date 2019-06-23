import { storiesOf } from '@storybook/html';

import notes from './Menu.md';

import { MenuDemo1 } from './stories/MenuEx.basic.story';
import { MenuDemo2 } from './stories/MenuEx.scroll.story';
import { MenuDemo3 } from './stories/MenuEx.nested.story';

storiesOf('Menu', module)
  .addParameters({ notes })
  .add('Basic', () => {
    return new MenuDemo1();
  })
  .add('Scroll behavior', () => {
    return new MenuDemo2();
  })
  .add('Nested menu', () => {
    return new MenuDemo3();
  });
