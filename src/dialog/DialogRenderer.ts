import { LitElement, html, unsafeCSS } from 'lit-element';

import style from './DialogRenderer.scss';

export class DialogRenderer extends LitElement {

  static styles = [unsafeCSS(style)];

  render() {
    return html`
      <slot></slot>
    `;
  }
}
