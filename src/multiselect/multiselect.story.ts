import { storiesOf } from '@storybook/html';
// import { html, render } from 'lit-html';

// SUT
import notes from './Multiselect.md';

storiesOf('Multiselect', module)
  .addParameters({
      notes: { markdown: notes }
  })
  .add('Basic', () => {

      const customComp = document.createElement('wf-multiselect');

      return customComp;
  });