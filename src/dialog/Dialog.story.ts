import { storiesOf } from '@storybook/html';
import { component, useState } from 'haunted';
import { html } from 'lit-element';

import notes from './Dialog.md';
import { makeSetup } from './Dialog';

export const DialogDemo: any = component(function DialogDemo(this: HTMLElement) {

  const [open, setOpen] = useState(true);

  const setup = makeSetup((elm) => {

    setTimeout(() => elm.innerHTML = `
      <h2 slot='header'>Awesome dialog</h2>
      <p>This is a great thing to do.</p>
      <p>This is a great thing to do.</p>
      <p>This is a great thing to do.</p>
      <p>This is a great thing to do.</p>
      <wf-button slot='footer' variant='unelevated'>Proceed</wf-button>
      <wf-button slot='footer'>Cancel</wf-button>
    `, 100);
    // setTimeout(() => setOpen(false), 2000);

  }, (elm, cxt) => { });

  // Write article: Understanding dialog box design considerations
  return html`
    <div>
      <wf-button variant='raised' @click=${() => setOpen(!open)}>Open Dialog</wf-button>
      <wf-dialog .setup=${setup} .open=${open} @closing=${() => setOpen(false)}></wf-dialog>
    </div>
  `;
});

customElements.define('wf-dialog-demo', DialogDemo);

storiesOf('Dialog', module)
  .addParameters({ notes })
  .add('Basic', () => {
    return new DialogDemo();
  });
