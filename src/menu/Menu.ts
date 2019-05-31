import { LitElement, html, property, TemplateResult } from 'lit-element';
import { render } from 'lit-html';
import { create, SurfaceCtrl } from '../surface/Service';
import { setChildren } from '../surface/helper';

/**
 * @export
 * @class Menu
 * @extends {LitElement}
 */
export class Menu<T = any> extends LitElement {

  static styles = [];

  @property()
  renderer: ((item: T) => TemplateResult) = (item) => html`<div>${item}</div>`;

  private listCache: Map<T, HTMLElement> = new Map();

  private surfaceCtrl: SurfaceCtrl = create();

  private menuListEl: HTMLElement = document.createElement('div');

  private open: boolean = false;

  set items(items: T[]) {
    this.renderItems(items);
  }

  constructor() {
    super();

    this.surfaceCtrl.children([this.menuListEl]);
  }

  private renderItems(items: T[]) {
    const newMap = new Map();

    items.map((item) => {
      const elm = this.listCache.get(item) || document.createElement('div');

        render(this.renderer(item), elm);

        newMap.set(item, elm);
      });

      this.listCache = newMap;
    }

  private openMenu() {

    setChildren(this.menuListEl, Array.from(this.listCache.values()));

    this.surfaceCtrl.show();
    this.open = true;
  }

  render() {
    return html`
      <slot @click=${this.openMenu}></slot>
    `;
  }

}