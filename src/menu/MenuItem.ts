import { LitElement, unsafeCSS, html, property } from 'lit-element';

import { emit } from '../util';

import style from './MenuItem.scss';

export class MenuItem extends LitElement {

  static styles = [unsafeCSS(style)];

  @property({ reflect: true, type: Boolean })
  public disabled: boolean = false;

  @property()
  public triggerFor?: string;

  @property({ reflect: true, type: Boolean })
  public highlight: boolean = false;

  constructor() {
    super();

    // Use when user uses mouse to select item
    this.addEventListener('click', () => {
      this.emitSelect();
    });

    this.addEventListener('mouseenter', () => {
      this.emitIfActive('submenuOpen');
    });

    // Use when user uses keyboard to select item
    this.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ')) {
        this.emitSelect();
      } else if (this.triggerFor && e.key === 'ArrowRight') {
        this.emitIfActive('submenuOpen');
      } else if (e.key === 'ArrowLeft') {
        this.emitIfActive('submenuCloseCurrent');
      } else if (e.key === 'ArrowDown') {
        this.emitIfActive('next');
      } else if (e.key === 'ArrowUp') {
        this.emitIfActive('previous');
      }
    });
  }

  private emitSelect() {
    if (this.triggerFor) {
      this.emitIfActive('submenuOpen');
    } else {
      this.emitIfActive('select');
    }
  }

  private emitIfActive<T>(eventName: string, data?: T) {
    // Do not raise the event if disabled is set to true
    if (!this.disabled) {
      emit(this, eventName, data);
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}
