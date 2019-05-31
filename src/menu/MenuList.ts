import { LitElement, html, property, TemplateResult, unsafeCSS } from 'lit-element';

/**
 * @export
 * @class Menu
 * @extends {LitElement}
 */
export class MenuList<T = any> extends LitElement {

  @property()
  renderer: ((item: T) => TemplateResult) = (item) => html`${item}`;

  @property()
  items: T[] = [];

  protected createRenderRoot() {
    return this;
  }

  render() {

    const items = this.items.map((x) => html`
      <wf-menu-item>${this.renderer(x)}</wf-menu-item>`);

    return html`${items}`;
  }

}

export class MenuItem extends LitElement {

  static styles = [];

  protected createRenderRoot() {
    return this;
  }
}