import { storiesOf } from '@storybook/html';
import { component } from 'haunted';
import { customElement, LitElement, html } from 'lit-element';

// SUT
import notes from './Surface.md';
import { create } from './Service';

storiesOf('Surface', module)
  .addParameters({ notes })
  .add('Basic', () => {

    const surfaces: Array<ReturnType<typeof create>> = [];

    const DialogContent = component(() => {

      function showAnother() {
        const surface = create();

        surface.children([
          document.createElement('wf-surface-demo-1-1')
        ]);

        surface.show();

        surfaces.push(surface);
      }

      function dismiss() {
        const surface = surfaces.pop();

        surface!.dismiss();
      }

      return html`
        <div>
          <button @click=${showAnother}>Show another</button>
          <button @click=${dismiss}>Hide surface</button>
        </div>
      `;
    });

    const Demo = component(() => {

      const show = () => {

        const surface = create();

        surface.children([
          document.createElement('wf-surface-demo-1-1')
        ]);

        surface.show();

        surfaces.push(surface);
      }

      return html`
        <div>
          <button @click=${show}>Show surface</button>
        </div>
      `;
    });

    customElements.define('wf-surface-demo-1', Demo);
    customElements.define('wf-surface-demo-1-1', DialogContent);

    return document.createElement('wf-surface-demo-1');
  });
