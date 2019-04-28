import classnames from 'classnames';
import { LitElement, html, customElement, unsafeCSS, property } from 'lit-element';

import style from './banner.scss';

@customElement('wf-banner')
export class BannerElement extends LitElement {

  static styles = [unsafeCSS(style)];

  @property({ type: Boolean })
  private openBanner: boolean = false;

  @property({ type: Boolean })
  private fixedPosition: boolean = false;


  render () {
    const classes = classnames('banner', this.openBanner && 'open',
        this.fixedPosition && 'positionFixed');

    return html `
      <div class='${classes}'>
        <div class='content'>
          <slot name='bannerContent'><slot>
        </div>
        <div class='action'>
          <slot name='bannerAction'></slot>
        </div>
      </div>
    `;
  }
}