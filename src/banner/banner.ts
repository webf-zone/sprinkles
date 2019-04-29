import classnames from 'classnames';
import { LitElement, html, customElement, unsafeCSS, property } from 'lit-element';

import style from './banner.scss';

@customElement('wf-banner')
export class BannerElement extends LitElement {

  static styles = [unsafeCSS(style)];

  @property({ type: Boolean })
  public open: boolean = false;

  public set fixed(val: boolean) {
    if (val) {
      this.classList.add('fixed');
    } else {
      this.classList.remove('fixed');
    }
  }

  render() {

    const classes = classnames('banner', this.open && 'open');

    return html`
      <div class=${classes}>
        <div class='content'>
          <slot></slot>
        </div>
        <div class='action'>
          <slot name='action'></slot>
        </div>
      </div>
    `;
  }
}
