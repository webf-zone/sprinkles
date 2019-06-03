import { LitElement, html, property, TemplateResult, unsafeCSS } from 'lit-element';
import { create, SurfaceCtrl } from '../surface/Service';
import { MenuList } from './MenuList';
import { suggest, getFixedPixels, MenuPosition } from './MenuPosition';
import { applyStyle, emit } from '../util';

import style from './Menu.scss';

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

  private open: boolean = false;
  private overlayHandler?: any;

  set items(items: T[]) {
    this.menuListEl.items = items;
  }

  set renderer(func: (item: T) => TemplateResult) {
    this.menuListEl.renderer = func;
  }

  constructor() {
    super();

    this.surfaceCtrl.children([this.menuListEl]);

    this.menuListEl.addEventListener('select', (e: any) => {
      emit(this, 'select', e.detail);
      this.requestDismiss(false);
    });

    this.menuListEl.addEventListener('dismiss', () => this.requestDismiss(true));
  }

  disconnectedCallback() {
    this.requestDismiss(true);
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

    this.overlayHandler = this.createDismissHandler();

    this.open = true;
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
        this.menuListEl.openList();
        this.surfaceCtrl.backdrop.addEventListener('click', this.overlayHandler);
      });
    });
  }

  private requestDismiss(immediate: boolean) {
    if (this.open) {
      this.dismissMenu(immediate);
    }
  }

  private dismissMenu(immediate: boolean) {

    // Follow exact reverse steps.
    // Additionally need transition event handler for smooth transition.
    // 1. Remove dismiss handler.
    // 2. Remove transition class.
    // 3. After transition is complete, remove the surface from document.body.

    if (immediate) {
      this.clearSurface();
    } else {
      const transitionEndHandler = (e: TransitionEvent) => {
        if (e.propertyName === 'transform') {
          this.menuListEl.removeEventListener('transitionend', transitionEndHandler);
          this.clearSurface();
        }
      };
      this.menuListEl.addEventListener('transitionend', transitionEndHandler);
    }

    this.surfaceCtrl.backdrop.removeEventListener('click', this.overlayHandler);
    this.open = false;
    requestAnimationFrame(() => this.menuListEl.dismissList());
  }

  private clearSurface() {
    this.surfaceCtrl.dismiss();
    this.overlayHandler = undefined;
  }

  private createDismissHandler() {
    const handler = () => {
      this.requestDismiss(false);
    };

    return handler;
  }

  render() {
    return html`
      <slot @click=${this.openMenu}></slot>
    `;
  }

}