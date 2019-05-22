import classNames from 'classnames';
import { LitElement, html, unsafeCSS, property } from 'lit-element';

import style from './explorer.scss';

export class Explorer extends LitElement {

  static styles = [unsafeCSS(style)];

  @property({ type: Boolean })
  public show: boolean = false;


  render() {

    const show = classNames('sidebar', this.show && 'show');
    const hide = classNames('main', this.show && 'hide');

    return html `
      <div class='explorer'>
        <div class=${show}>
          <slot name='sidebar'></slot>
        </div>
        <div class=${hide}>
          <slot></slot>
        </div>
      </div>
    `;
  };
};
