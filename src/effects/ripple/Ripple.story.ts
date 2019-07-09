import { storiesOf } from '@storybook/html';
import { component } from 'haunted';
import { html } from 'lit-element';

import notes from './Ripple.md';

export const RippleDemo: any = component(function RippleDemo(this: HTMLElement) {

  return html`
    <style>
      wf-surface-ripple {
        margin: 8px;
        padding: 16px;

        background: #0AAB8A;
      }
    </style>
    <div>
      <h2>Simple buttons - with ripple</h2>
      <wf-surface-ripple>
        <div>Any element can be wrapped in a surface</div>
      </wf-surface-ripple>
    </div>
  `;
});

customElements.define('wf-surface-ripple-demo', RippleDemo);

storiesOf('Effects|Ripple', module)
  .addParameters({ notes })
  .add('Basic', () => new RippleDemo());
