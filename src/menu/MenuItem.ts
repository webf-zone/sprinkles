import { LitElement, unsafeCSS, html, property } from 'lit-element';

import { emit } from '../util';

import style from './MenuItem.scss';

export class MenuItem extends LitElement {

  static styles = [unsafeCSS(style)];

  @property({ reflect: true, type: Boolean })
  public disabled: boolean = false;

  constructor() {
    super();

    // Use user uses mouse to select item
    this.addEventListener('click', (e) => emit(this, 'select'));

    // Use user uses keyboard to select item
    this.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        emit(this, 'select');
      }
    });
  }

  render() {
    return html`<slot></slot>`;
  }
}
