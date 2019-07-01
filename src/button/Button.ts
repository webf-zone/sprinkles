import { LitElement, html, unsafeCSS, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

import style from './Button.scss';

export type ButtonType = 'submit' | 'button' | 'reset';
export type ButtonVariant = 'text' | 'outlined' | 'unelevated' | 'raised';

// Classes to be added
const map: { [k in ButtonVariant]: string } = {
  text: 'mdc-button',
  outlined: 'mdc-button--outlined',
  unelevated: 'mdc-button--unelevated',
  raised: 'mdc-button--raised'
};

export class Button extends LitElement {

  static styles = [unsafeCSS(style)];

  @property({ reflect: true, type: String })
  type: ButtonType = 'button';

  @property({ reflect: true, type: String })
  variant: ButtonVariant = 'text';

  @property({ reflect: true, type: Boolean })
  disabled: boolean = false;

  public get applicableClasses() {
    return map[this.variant];
  }

  // protected createRenderRoot() {
  //   return this.attachShadow({ mode: 'open', delegatesFocus: true });
  // }

  // WARNING: This is highly experimental stuff.
  // Not sure if this is the right practice.
  public focus(opts?: FocusOptions) {
    super.focus(opts);

    const button = this.shadowRoot && this.shadowRoot.querySelector('button');

    if (button) {
      button.focus();
    }
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  render() {

    const classes = classMap({
      'mdc-button': true,
      [this.applicableClasses]: true
    });

    return html`
      <wf-surface-ripple ?disabled=${this.disabled}>
        <button type=${this.type} class=${classes} ?disabled=${this.disabled}>
          <slot></slot>
        </button>
      </wf-surface-ripple>
    `;
  }

}
