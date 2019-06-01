import { LitElement, html, property, TemplateResult, unsafeCSS } from 'lit-element';
import { create, SurfaceCtrl } from '../surface/Service';
import { MenuList } from './MenuList';
import { suggest, getFixedPixels, MenuPosition } from './MenuPosition';

import style from './Menu.scss';
import { applyStyle } from '../util';

const transform: { [key in MenuPosition]: Partial<CSSStyleDeclaration>; } = {
  'top-left': { transformOrigin: 'top left' },
  'top-right': { transformOrigin: 'top right' },
  'bottom-left': { transformOrigin: 'bottom left' },
  'bottom-right': { transformOrigin: 'bottom right' }
};

/**
 * @export
 * @class Menu
 * @extends {LitElement}
 */
export class Menu<T = string> extends LitElement {

  static styles = [unsafeCSS(style)];

  private surfaceCtrl: SurfaceCtrl = create();

  private menuListEl: MenuList<T> = new MenuList<T>();
  private inlineStyle: Partial<CSSStyleDeclaration> = {};

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


    const dismissHandler = () => {

      const transitionEnd = (e: TransitionEvent) => {
        if (e.propertyName === 'transform') {
          this.menuListEl.removeEventListener('transitionend', transitionEnd);

          this.surfaceCtrl.dismiss();
        }
      };

      this.surfaceCtrl.overlay.removeEventListener('click', dismissHandler);
      this.menuListEl.addEventListener('transitionend', transitionEnd);

      requestAnimationFrame(() => this.menuListEl.classList.remove('open'));
    };

    this.surfaceCtrl.overlay.addEventListener('click', dismissHandler);

    requestAnimationFrame(() => {
      const suggestion = suggest(this, this.menuListEl);
      const position = getFixedPixels(this, suggestion);

      const styles = {
        ...position,
        ...transform[suggestion]
      } as any;

      applyStyle(this.menuListEl, styles, this.inlineStyle);

      this.inlineStyle = styles;

      requestAnimationFrame(() => {
        this.menuListEl.classList.add('open');
      });
    });
  }

  render() {
    return html`
      <slot @click=${this.openMenu}></slot>
    `;
  }

}