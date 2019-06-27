import { LitElement, css } from 'lit-element';
import { spring, styler, ColdSubscription } from 'popmotion';

import { DialogRenderer } from './DialogRenderer';
import { create, SurfaceCtrl } from '../surface/Service';

export type DialogInit<T> = (elm: DialogRenderer) => T;
export type DialogCleanup<T> = (elm: DialogRenderer, context: T) => void;

export type DialogSetup<T = any> = {
  init: (elm: DialogRenderer) => T;
  teardown?: (elm: DialogRenderer, context: T) => void;
};

export function makeSetup<T>(init: DialogInit<T>, teardown?: DialogCleanup<T>): DialogSetup<T> {
  return { init, teardown };
}

export class Dialog<T> extends LitElement {

  static styles = [css`:host { display: none; }`];

  setup?: DialogSetup<T>;
  setupContext?: T;

  private renderer!: DialogRenderer;
  private surface!: SurfaceCtrl;
  private initCalled: boolean = false;
  private isOpen: boolean = false;

  private focusableElm: Element | null = null;

  private animationSub?: ColdSubscription;

  constructor() {
    super();
  }

  get open() {
    return this.hasAttribute('open');
  }

  set open(val: boolean) {

    // Reflect the value of the open property as an HTML attribute.
    if (val) {
      this.setAttribute('open', '');
      this.showDialog();
    } else {
      this.removeAttribute('open');
      this.dismissDialog();
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this.renderer = new DialogRenderer();
    this.surface = create();

    if (this.open) {
      this.showDialog();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.dismissDialog();

    if (this.initCalled && this.setup && this.setup.teardown) {
      this.setup.teardown(this.renderer, this.setupContext!);
    }

    this.renderer = null as any;
    this.surface = null as any;
    this.setupContext = undefined;
    this.initCalled = false;

    this.stopSubscriptions();
  }

  private showDialog() {

    // Do nothing if dialog is already open.
    // Also, for dialog to show, it must be connected to the DOM.
    // If it is not connected then, there is no point in opening the it.
    if (this.isOpen || !this.isConnected) {
      return;
    }

    this.focusableElm = this.findFocusableItem(document.activeElement);

    // Call init function only once
    if (!this.initCalled && this.setup) {
      this.setupContext = this.setup.init(this.renderer);
      this.initCalled = true;
    }

    this.surface.children([this.renderer]);
    this.surface.show();

    // Animation action
    const action = spring({
      from: { scale: 0.8, x: '-50%', y: '-60%' },
      to: { scale: 1, x: '-50%', y: '-60%' },
      stiffness: 200
    });

    const myStyler = styler(this.renderer);

    // Stop if any previous animation was running
    this.stopSubscriptions();

    this.animationSub = action.start({
      update: (v: any) => myStyler.set(v),
      complete: () => this.animationSub = undefined
    });

    this.isOpen = true;
  }

  private dismissDialog() {

    if (!this.isOpen) {
      return;
    }

    this.isOpen = false;
    this.surface.dismiss();
    this.surface.children([]);

    if (this.focusableElm) {
      (this.focusableElm as HTMLElement).focus();
      this.focusableElm = null;
    }
  }

  private stopSubscriptions() {
    this.animationSub && this.animationSub.stop();
    this.animationSub = undefined;
  }

  private findFocusableItem(currentElm: Element | null): Element | null {
    // Recursively attempt to find currently focused item.
    // Pierce through the shadow dom as much as possible.
    if (currentElm) {
      if (currentElm.shadowRoot) {
        return this.findFocusableItem(currentElm.shadowRoot.activeElement);
      } else {
        return currentElm;
      }
    } else {
      return null;
    }
  }
}

