import { LitElement, html, property, TemplateResult, unsafeCSS } from 'lit-element';
import { render } from 'lit-html';

import style from './MenuList.scss';
import style2 from './MenuItem.scss';

/**
 * @export
 * @class Menu
 * @extends {LitElement}
 */
export class MenuList<T = any> extends LitElement {

  static styles = [unsafeCSS(style)];

  @property()
  renderer: ((item: T) => TemplateResult) = (item) => html`${item}`;

  set items(items: T[] | undefined) {

    const results = (items || []).map((x) => html`
      <wf-menu-item>${this.renderer(x)}</wf-menu-item>`);

    render(html`${results}`, this);
  }

  render() {
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