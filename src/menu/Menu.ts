import { LitElement, html, property, TemplateResult } from 'lit-element';
import { render } from 'lit-html';
import { create, SurfaceCtrl } from '../surface/Service';
import { setChildren } from '../surface/helper';
import { MenuList } from './MenuList';

/**
 * @export
 * @class Menu
 * @extends {LitElement}
 */
export class Menu<T = string> extends LitElement {

  static styles = [];

  private surfaceCtrl: SurfaceCtrl = create();

  private menuListEl: MenuList<T> = new MenuList<T>();

  private open: boolean = false;

  set items(items: T[]) {
    this.menuListEl.items = items;
  }

  set renderer(func: (item: T) => TemplateResult) {
    this.menuListEl.renderer = func;
  }

  constructor() {
    super();

    this.surfaceCtrl.children([this.menuListEl]);
  }

  private openMenu() {
    this.surfaceCtrl.show();
    this.open = true;
  }

  render() {
    return html`
      <slot @click=${this.openMenu}></slot>
    `;
  }

}