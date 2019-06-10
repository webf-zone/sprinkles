import { storiesOf } from '@storybook/html';
import { component } from 'haunted';
import { html } from 'lit-element';

import notes from './Button.md';

export const ButtonDemo: any = component(function ButtonDemo(this: HTMLElement) {

  return html`
    <style>
      wf-button { margin: 8px; }
    </style>
    <div>
      <h2>Simple buttons - Text only</h2>
      <wf-button>Open</wf-button>
      <wf-button .variant=${'outlined'}>Open</wf-button>
      <wf-button .variant=${'unelevated'}>Open</wf-button>
      <wf-button .variant=${'raised'}>Open</wf-button>
    </div>

    <div>
      <h2>Disabled button</h2>
      <wf-button ?disabled=${true}>Open</wf-button>
    </div>
  `;

});

customElements.define('wf-button-demo', ButtonDemo);

storiesOf('Button', module)
  .addParameters({ notes })
  .add('All', () => {
    return new ButtonDemo();
  });
