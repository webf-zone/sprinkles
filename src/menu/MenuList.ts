import { LitElement, html, property, TemplateResult, unsafeCSS } from 'lit-element';
import { render } from 'lit-html';

import style from './MenuList.scss';
import style2 from './MenuItem.scss';

export const MENU_DIVIDER = Symbol();

export type Divider = typeof MENU_DIVIDER;

/**
 * @export
 * @class Menu
 * @extends {LitElement}
 */
export class MenuList<T = any> extends LitElement {

  static styles = [unsafeCSS(style)];

  @property()
  renderer: ((item: T) => TemplateResult) = (item) => html`${item}`;

  @property()
  private currentFocus: number = -1;

  @property()
  public items?: Array<(T | Divider)> = [];

  private open: boolean = false;

  constructor() {
    super();

    this.tabIndex = -1;
  }

  public openList() {
    this.open = true;
    this.classList.add('open');
    this.tabIndex = 0;
    this.currentFocus = 0;
  }

  public dismissList() {
    this.open = false;
    this.classList.remove('open');
    this.tabIndex = -1;
    this.currentFocus = -1;
  }

  private renderLightDOM() {
    const results = (this.items || []).map((x, i) => this.renderItem(x, i));

    render(html`${results}`, this);
  }

  private renderItem(x: T | Divider, index: number) {
    return x === MENU_DIVIDER
      ? html`<wf-menu-item class='divider'></wf-menu-item>`
      : html`
          <wf-menu-item .tabIndex=${this.currentFocus === index ? 0 : -1 }>
            ${this.renderer(x)}
          </wf-menu-item>
        `;
  }

  render() {

    // First update the lightDOM
    this.renderLightDOM();

    return html`<slot></slot>`;
  }

}

export class MenuItem extends LitElement {

  static styles = [
    unsafeCSS(style2)
  ];

  render() {
    return html`<slot></slot>`;
  }
}