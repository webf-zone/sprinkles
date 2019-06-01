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

  private createDismissHandler() {

    // Follow exact reverse steps.
    // Additionally need transition event handler for smooth transition.
    // 1. Remove dismiss handler.
    // 2. Remove transition class.
    // 3. After transition is complete, remove the surface from document.body.

    const transitionEnd = (e: TransitionEvent) => {
      if (e.propertyName === 'transform') {
        this.menuListEl.removeEventListener('transitionend', transitionEnd);
        this.surfaceCtrl.dismiss();
      }
    };

    const handler = () => {
      this.surfaceCtrl.overlay.removeEventListener('click', handler);
      this.menuListEl.addEventListener('transitionend', transitionEnd);

      requestAnimationFrame(() => this.menuListEl.classList.remove('open'));
    };

    return handler;
  }

  private openMenu() {

    // Steps to show dropdown menu:
    // 1. Add the surface to document.body.
    // 2. Show the surface so that dimensions of floating MenuListEl can be computed.
    // 3. Generate a dropdown dismiss handler.
    // 4. Calculate menu-transition direction and fixed position.
    // 5. Apply those styles to the MenuListEl.
    // 6. Add the transition class.
    // 7. Assign a dismiss handler.
    // When dismissing, exact reverse sequence must be followed.

    const dismissHandler = this.createDismissHandler();

    this.surfaceCtrl.show();

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
        this.surfaceCtrl.overlay.addEventListener('click', dismissHandler);
      });
    });
  }

  render() {
    return html`
      <slot @click=${this.openMenu}></slot>
    `;
  }

}