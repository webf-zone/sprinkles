import { storiesOf } from '@storybook/html';
import { html, render } from 'lit-html';


import notes from './Banner.md';

storiesOf('Banner', module)
  .addParameters({
    notes
  })
  .add('Simple', () => {

    const data = { open: false };

    const rootElm = document.createDocumentFragment();

    const onToggle = () => {
      data.open = !data.open;
      render(template(data), rootElm);
    };

    const onDismiss = () => {

    };

    const template = (data: any) => html`
      <div>
        <wf-banner .open=${data.open}>
          <span>Banner Text</span>
          <button slot='action'>Dismiss</button>
        </wf-banner>
      </div>
      <button @click=${onToggle}>Toggle</button>
    `;

    // Render using lit-html
    render(template(data), rootElm);

    return rootElm;
  })
  .add('Fixed Position', () => {

    const rootElm = document.createDocumentFragment();

    const template = () => html`
      <div>
        <wf-banner .open=${true} .fixed=${true}>
          <span>Banner Text</span>
          <button slot='action'>Dismiss</button>
        </wf-banner>
      </div>
    `;

    // Render using lit-html
    render(template(), rootElm);

    return rootElm;
  });