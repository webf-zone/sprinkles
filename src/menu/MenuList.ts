import { LitElement, TemplateResult, unsafeCSS, property } from 'lit-element';
import { tween, easing, styler } from 'popmotion';

import { listen } from '../Event';
import { emit, applyStyle, promisor } from '../util';
import { MenuListRenderer } from './MenuListRenderer';
import { MenuDirection, compute } from './MenuPosition';

import style from './MenuList.scss';

export const MENU_DIVIDER = Symbol();

export type Divider = typeof MENU_DIVIDER;

const transform: { [key in MenuDirection]: Partial<CSSStyleDeclaration>; } = {
  'top-left': { transformOrigin: 'top left' },
  'top-right': { transformOrigin: 'top right' },
  'bottom-left': { transformOrigin: 'bottom left' },
  'bottom-right': { transformOrigin: 'bottom right' }
};


export interface MenuListItem {
  label?: string;
  disabled?: boolean;
  triggerFor?: string;
}

export class MenuList<T extends MenuListItem> extends LitElement {

  static styles = [unsafeCSS(style)];

  @property({ type: String, reflect: true })
  public wfId: string = '';

  public listEl: MenuListRenderer<T> = new MenuListRenderer();

  public overlapping: boolean = false;

  private selectSub = listen('select', this.listEl);
  private keydownSub = listen('keydown', this.listEl);

  private listElStyler = styler(this.listEl);

  private inlineStyle: Partial<CSSStyleDeclaration> = {};

  public anchor?: HTMLElement;

  public set items(items: T[]) {
    this.listEl.items = items;
  }

  set renderer(func: (item: T) => TemplateResult) {
    this.listEl.renderer = func;
  }

  connectedCallback() {
    super.connectedCallback();

    this.selectSub.on((e: any) => {
      emit(this, 'select', e.detail);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.selectSub.off();
    this.keydownSub.off();
  }

  public openMenu() {

    const [promise, resolve, reject] = promisor();

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

    this.listEl.openList();

    action.start({
      update: (v: any) => this.listElStyler.set(v),
      complete: () => {
        resolve();
      }
    });

    return promise;
  }

  private dismissMenu() {
    this.listEl.dismissList();
  }

  private applyPosition() {
    // These functions will force layout thrashing
    const position = compute(this.getAnchor()!, this.listEl, this.overlapping);

    const styles = {
      ...position.style,
      ...transform[position.direction],
      minWidth: `${Math.max(this.offsetWidth, 112)}px`
    } as any;

    applyStyle(this.listEl, styles, this.inlineStyle);

    this.inlineStyle = styles;
  }

  // Async operation
  open(anchor: HTMLElement) {
    this.anchor = anchor;
    return this.openMenu();
  }

  // Async operation
  dismiss() {
    this.dismissMenu();
    this.anchor = undefined;
  }

  private getAnchor() {
    return this.anchor;
  }

}
