import { LitElement, html, property, TemplateResult, unsafeCSS } from 'lit-element';
import { render } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

import { emit } from '../util';
import { MenuItem } from './MenuItem';

import style from './MenuListRenderer.scss';

import { MenuListItem, Divider, MENU_DIVIDER } from './MenuList';

/**
 * @export
 * @class Menu
 * @extends {LitElement}
 */
export class MenuListRenderer<T extends MenuListItem> extends LitElement {

  static styles = [unsafeCSS(style)];

  @property()
  renderer: ((item: T) => TemplateResult) = (item) => html`${item.label}`;

  @property()
  items: Array<(T | Divider)> = [];

  private currentFocus: number = -1;
  private open: boolean = false;

  public openList() {
    this.open = true;
  }

  public dismissList() {
    this.open = false;

    const items = this.querySelectorAll('wf-menu-item');
    items.forEach((x: any) => x.highlight = false);
  }

  private renderItem(x: T | Divider, index: number) {

    if (x === MENU_DIVIDER) {
      return html`<wf-menu-item class='divider'></wf-menu-item>`;
    } else {
      const tabIndex = x.disabled ? undefined : this.currentFocus === index ? 0 : -1;
      const { triggerFor, disabled } = x;

      return html`
        <wf-menu-item ?disabled=${disabled}
          .triggerFor=${ifDefined(triggerFor)}
          .tabIndex=${ifDefined(tabIndex)}
          @select=${() => this.onSelect(x)}
          @next=${this.focusNext}
          @previous=${this.focusPrevious}
          @submenuOpen=${(e: Event) => this.openSubmenu(e.target as any, x.triggerFor)}
          @submenuCloseCurrent=${this.closeCurrentSubmenu}>
            ${this.renderer(x)}
        </wf-menu-item>`;
    }
  }

  private renderLightDOM() {
    const results = this.items.map((x, i) => this.renderItem(x, i));

    render(html`${results}`, this, { eventContext: this });
  }

  render() {

    // This is a bit hacky part
    // First update the lightDOM
    this.renderLightDOM();

    return html`<slot></slot>`;
  }

  private onSelect(x: T) {
    const index = this.items.indexOf(x);

    this.currentFocus = index;
    emit(this, 'select', x);
  }

  private focusNext() {
    const currentFocus = this.findNextItemToFocus(this.currentFocus + 1);
    this.focusMenuItem(currentFocus);
  }

  private focusPrevious() {
    const currentFocus = this.findPreviousItemToFocus(this.currentFocus - 1);
    this.focusMenuItem(currentFocus);
  }

  private openSubmenu(anchor: MenuItem, listId?: string) {
    emit(this, 'open', { listId, anchor });
  }

  private closeCurrentSubmenu() {
    emit(this, 'dismissCurrent');
  }

  public focusMenuItem(currentFocus: number) {
    const menuItems = this.querySelectorAll('wf-menu-item') as any as MenuItem[];

    if (this.open && menuItems[currentFocus]) {
      menuItems[currentFocus].focus();
      this.currentFocus = currentFocus;
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
