import { component } from 'haunted';
import { html } from 'lit-element';

import { create } from '../Service';

const stack: Array<ReturnType<typeof create>> = [];

const DialogContent: any = component(() => {

  function showAnother() {
    const surface = create();

    surface.children([
      new DialogContent()
    ]);

    surface.show();

    stack.push(surface);
  }

  function dismiss() {
    const surface = stack.pop();

    surface!.dismiss();
  }

  return html`
    <style>
      :host { }
    </style>
    <div>
      <button @click=${showAnother}>Show another</button>
      <br />
      <button @click=${dismiss}>Hide surface</button>
    </div>
  `;
});

export const Demo: any = component(function Demo(this: HTMLElement) {

  const show = () => {

    const surface = create();

    surface.children([
      new DialogContent()
    ]);

    surface.show();

    stack.push(surface);
  }

  return html`
    <style>
      button {
        position: absolute;
        top: 200px;
        left: 400px;
      }
    </style>
    <div>
      <button @click=${show}>Show surface</button>
    </div>
  `;
});

customElements.define('wf-surface-demo-1', Demo);
customElements.define('wf-surface-demo-1-1', DialogContent);