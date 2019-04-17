// SUT
import '../src/multiselect/multiselect';


import { withNotes } from '@storybook/addon-notes';
import { addDecorator, configure } from '@storybook/html';

// withNotes
addDecorator(withNotes);


function loadStories() {
  require('../src/multiselect/multiselect.story');
}

configure(loadStories, module);
