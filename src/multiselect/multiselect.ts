import classnames from 'classnames';
import { html, LitElement, customElement, property, unsafeCSS } from 'lit-element';

import { emit } from '../util';

import style from './multiselect.scss';

@customElement('wf-multiselect')
export class MultiSelect<T extends { label: string } = any> extends LitElement {

  static styles = [unsafeCSS(style)];

  @property()
  public placeholder: string = '';

  // Pre-selected item
  @property()
  public value: T[] = [];

  @property()
  public selected: T[] = [{ label: 'hello'} as any];

  @property()
  public loading: boolean = false;

  @property()
  public toText: (val: T) => string = (val: T) => val.label;

  // Whether to allow user to select item from multiselect
  @property()
  public disabled: boolean = false;

  @property()
  private opened: boolean = false;

  private onInputFocus(e: any) {
    // console.log('Focus', e);
    this.opened = true;
  }

  private onInputBlur(e: any) {
    // console.log('Blur', e);
    this.opened = false;
  }

  private onKeyDown(e: any) {
    // console.log(e);
  }

  private onInput(e: Event) {
    emit(this, 'search', (e.target as HTMLInputElement).value);
  }

  private renderChips(itemsToRender: T[]) {
    return itemsToRender.map((x) => html`
      <span class='chip'>
        <span class='chip__text'>${this.toText(x)}</span>
        <svg class='chip__clear' xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'>
          <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/>
          <path d='M0 0h24v24H0z' fill='none'/>
        </svg>
      </span>
    `);
  }

  private onClick() {
    console.log('This is good');
  }

  render() {

    const classes = classnames('multiselect', this.opened && 'multiselect--opened');
    // const classes = classnames('multiselect', 'multiselect--opened');

    return html`
      <div class='${classes}'>
        <div class='header'>
          ${this.renderChips(this.selected)}
          <input type='text' placeholder='${this.placeholder}' .disabled='${this.disabled}'
            @focus='${this.onInputFocus}' @blur='${this.onInputBlur}'
            @input='${this.onInput}'
            @keydown='${this.onKeyDown}' />
        </div>
        <div class='content'>
          <div class='divider'>
            <div class='line'></div>
          </div>
          <div class='no-records'>
            <slot name='empty'>No records</slot>
          </div>
          <div class='list' @click='${this.onClick}'>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
          </div>
        </div>
      </div>
    `;
  }

}
