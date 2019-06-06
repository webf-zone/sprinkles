import { LitElement, html, TemplateResult, unsafeCSS } from 'lit-element';
import { styler, tween, easing } from 'popmotion';

import { listenScroll, listenResize, listen } from '../Event';
import { create, SurfaceCtrl } from '../surface/Service';
import { applyStyle, emit } from '../util';

import { MenuList } from './MenuList';
import { suggest, getFixedPixels, MenuPosition } from './MenuPosition';
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
export class Menu<T> extends LitElement {

  static styles = [unsafeCSS(style)];

  private surfaceCtrl: SurfaceCtrl = create();

  private menuListEl: MenuList<T> = new MenuList<T>();
  private inlineStyle: Partial<CSSStyleDeclaration> = {};

  private open: boolean = false;
  private dissmissFrame: number = 0;

  private scrollSub = listenScroll();
  private resizeSub = listenResize();
  private selectSub = listen('select', this.menuListEl);
  private keydownSub = listen('keydown', this.menuListEl);
  private backdropSub = listen('click', this.surfaceCtrl.backdrop);

  private menuStyler = styler(this.menuListEl);

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

  connectedCallback() {
    super.connectedCallback();

    this.selectSub.on((e: any) => {
      emit(this, 'select', e.detail);
      this.requestDismiss(false);
    });

    this.keydownSub.on((e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Tab') {
        this.requestDismiss(false);
      }
    });
  }

  disconnectedCallback() {
    this.requestDismiss(true);

    this.selectSub.off();
    this.keydownSub.off();
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

    this.open = true;
    this.surfaceCtrl.show();

    // This will cause layout thrashing
    this.applyPosition();

    const action = tween({
      duration: 160,
      ease: easing.easeOut,
      from: {
        opacity: 0,
        scaleX: 0,
        scaleY: 0
      },
      to: {
        opacity: 1,
        scaleX: 1,
        scaleY: 1
      },
    });

    this.menuListEl.openList();

    action.start({
      update: (v: any) => this.menuStyler.set(v),
      complete: () => {
        // Reapply position on scroll
        this.scrollSub.on(() => this.requestDismiss(true));
        this.resizeSub.on(() => this.requestDismiss(true));
        this.backdropSub.on(() => this.requestDismiss(false));
      }
    });
  }

  private applyPosition() {
    // These functions will force layout thrashing
    const suggestion = suggest(this, this.menuListEl);
    const position = getFixedPixels(this, suggestion);

    const styles = {
      ...position,
      ...transform[suggestion],
      minWidth: `${Math.max(this.offsetWidth, 112)}px`
    } as any;

    applyStyle(this.menuListEl, styles, this.inlineStyle);

    this.inlineStyle = styles;
  }

  private requestDismiss(immediate: boolean) {
    // Simulate queue like effect.
    // Chromium browsers synchronously fire focusout/blur events.
    // Thus we need a synchronization mechanism.
    if (this.open && this.dissmissFrame === 0) {
      this.dissmissFrame = requestAnimationFrame(() => this.dismissMenu(immediate));
    }
  }

  private dismissMenu(immediate: boolean) {

    // Follow exact reverse steps.
    // Additionally need transition event handler for smooth transition.
    // 1. Remove dismiss handler.
    // 2. Remove transition class.
    // 3. After transition is complete, remove the surface from document.body.

    if (immediate) {
      this.surfaceCtrl.dismiss();
    } else {
      const action = tween({
        duration: 160,
        ease: easing.easeOut,
        from: {
          opacity: 1,
          scaleX: 1,
          scaleY: 1
        },
        to: {
          opacity: 0.2,
          scaleX: 0,
          scaleY: 0
        },
      });

      action.start({
        update: (v: any) => this.menuStyler.set(v),
        complete: () => {
          this.surfaceCtrl.dismiss();
        }
      });
    }

    this.backdropSub.off();
    this.scrollSub.off();
    this.resizeSub.off();

    this.open = false;
    this.dissmissFrame = 0;
    this.menuListEl.dismissList();
  }

  render() {
    return html`
      <slot @click=${this.openMenu}></slot>
    `;
  }

}