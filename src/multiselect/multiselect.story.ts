import { storiesOf } from '@storybook/html';
import { html, render } from 'lit-html';

// SUT
import notes from './Multiselect.md';
import { MultiSelect } from './multiselect';

storiesOf('Multiselect', module)
  .addParameters({
    notes
  })
  .add('Smoke', () => {

    const customComp = document.createElement('wf-multiselect') as MultiSelect;

    customComp.placeholder = 'Search';

    return customComp;
  })
  .add('Basic', () => {

    const rootElm = document.createDocumentFragment();

    const template = (data: any) => html`
      <div style='overflow: hidden;'>
        <wf-multiselect placeholder='Search'></wf-multiselect>
      </div>
    `;

    // Render using lit-html
    render(template({ }), rootElm);

    return rootElm;
  });