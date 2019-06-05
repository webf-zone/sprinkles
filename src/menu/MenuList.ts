import { LitElement, html, property, TemplateResult, unsafeCSS } from 'lit-element';
import { render } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

import { emit } from '../util';
import { MenuItem } from './MenuItem';
import style from './MenuList.scss';

export const MENU_DIVIDER = Symbol();

export type Divider = typeof MENU_DIVIDER;

export interface MenuListItem {
  disabled?: boolean;
}

/**
 * @export
 * @class Menu
 * @extends {LitElement}
 */
export class MenuList<T extends MenuListItem> extends LitElement {

  static styles = [unsafeCSS(style)];

  @property()
  renderer: ((item: T) => TemplateResult) = (item) => html`${item}`;

  @property()
  private currentFocus: number = -1;

  @property()
  public items: Array<(T | Divider)> = [];

  @property()
  private open: boolean = false;

  constructor() {
    super();

    this.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Tab') {
        emit(this, 'dismiss');
      }
    });

  }

  public openList() {
    this.open = true;
    this.classList.add('open');

    this.currentFocus = this.findNextItemToFocus(0);
  }

  public dismissList() {
    this.open = false;
    this.classList.remove('open');
    this.currentFocus = -1;
  }

  private renderLightDOM() {
    const results = this.items.map((x, i) => this.renderItem(x, i));

    render(html`${results}`, this, { eventContext: this });
  }

  private renderItem(x: T | Divider, index: number) {

    if (x === MENU_DIVIDER) {
      return html`<wf-menu-item class='divider'></wf-menu-item>`;
    } else {
      const tabIndex = x.disabled ? undefined : this.currentFocus === index ? 0 : -1;

      return html`
        <wf-menu-item ?disabled=${x.disabled}
          .tabIndex=${ifDefined(tabIndex)}
          @select=${() => this.onSelect(x)}
          @keydown=${(e: KeyboardEvent) => this.onKeydown(e, x)}>
          ${this.renderer(x)}
        </wf-menu-item>`;
    }
  }

  render() {

    // This is a bit hacky part
    // First update the lightDOM
    this.renderLightDOM();

    return html`<slot></slot>`;
  }

  updated() {
    this.focusMenuItem(this.currentFocus);
  }

  private onKeydown(e: KeyboardEvent, x: T) {
    if (e.key === 'ArrowDown') {
      this.currentFocus = this.findNextItemToFocus(this.currentFocus + 1);
    } else if (e.key === 'ArrowUp') {
      this.currentFocus = this.findPreviousItemToFocus(this.currentFocus - 1);
    }
  }

  private onSelect(x: T) {
    // Do not raise the event if disabled is set to true
    if (x.disabled !== false) {
      const index = this.items.indexOf(x);

      this.currentFocus = index;
      emit(this, 'select', x);
    }
  }

  private focusMenuItem(currentFocus: number) {
    const menuItems = this.querySelectorAll('wf-menu-item') as any as MenuItem[];

    if (menuItems[currentFocus]) {
      menuItems[currentFocus].focus();
    }
  }

  private findPreviousItemToFocus(seedIndex: number): number {

    for (let i = seedIndex; i >= 0; i--) {
      const x = this.items[i];

      if (x !== MENU_DIVIDER && x.disabled !== true) {
        return i;
      }
    }

    for (let i = this.items.length - 1; i > seedIndex; i--) {
      const x = this.items[i];

      if (x !== MENU_DIVIDER && x.disabled !== true) {
        return i;
      }
    }

    return -1;
  }

  private findNextItemToFocus(seedIndex: number): number {

    for (let i = seedIndex; i < this.items.length; i++) {
      const x = this.items[i];

      if (x !== MENU_DIVIDER && x.disabled !== true) {
        return i;
      }
    }

    for (let i = 0; i < seedIndex; i++) {
      const x = this.items[i];

      if (x !== MENU_DIVIDER && x.disabled !== true) {
        return i;
      }
    }

    return -1;
  }

}
