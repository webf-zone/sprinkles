import { storiesOf } from '@storybook/html';

import notes from './Menu.md';

import { MenuDemo } from './stories/MenuEx.1.story';

storiesOf('Menu', module)
  .addParameters({ notes })
  .add('Basic', () => {
    return new MenuDemo();
  });
