import { storiesOf } from '@storybook/html';
import { html, render } from 'lit-html';

import notes from './Explorer.md';

storiesOf('Explorer', module)
  .addParameters({
    notes
  })
  .add('Simple', () => {
    const data = { show: false };

    const rootElm = document.createDocumentFragment();

    const showPanel = () => {
      data.show = !data.show;
      render(template(data), rootElm);
    };

    const template = (data: any) => html`
      <button @click=${showPanel}>Toggle Panel</button>
      <div>
        <wf-explorer .show=${data.show}>
          <div slot='sidebar'>Side Panel</div>
          <div>Main Panel</div>
        </wf-explorer>
      </div>
    `;

    // Render using the lit-html
    render(template(data), rootElm);

    return rootElm;
  });
