import { LitElement, html, unsafeCSS, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

import { emit } from '../util';
import { findFocusableItem } from './helper';
import style from './DialogRenderer.scss';

const INTENT_ATTR = 'wf-dialog-intent';


export class DialogRenderer extends LitElement {

  static styles = [unsafeCSS(style)];

  private sentinelObs: IntersectionObserver;
  private isObserving: boolean = false;

  @property()
  private hasHeader: boolean = false;

  @property()
  private hasFooter: boolean = false;

  @property()
  private topShadow: boolean = false;

  @property()
  private bottomShadow: boolean = false;

  private focusableElm: Element | null = null;

  constructor() {
    super();

    this.sentinelObs = new IntersectionObserver((entries) => this.onIntersection(entries));
  }

  connectedCallback() {
    super.connectedCallback();

    // The call is useless on first invocation as children are not rendered
    // This call is useful for future events when disconnected and connected
    this.setupObservation();
  }

  disconnectedCallback() {
    this.sentinelObs.disconnect();
    this.isObserving = false;
  }

  open() {
    this.focusableElm = findFocusableItem(document.activeElement);
  }

  dismiss() {
    if (this.focusableElm) {
      (this.focusableElm as HTMLElement).focus();
      this.focusableElm = null;
    }
  }

  private onIntersection(entries: IntersectionObserverEntry[]) {
    entries.forEach((x) => {
      if (x.target.classList.contains('top-sentinel'))
        return this.topShadow = !x.isIntersecting;
      else
        return this.bottomShadow = !x.isIntersecting;
    });
  }

  private setupObservation() {
    const topSentinel = this.shadowRoot && this.shadowRoot.querySelector('.top-sentinel');

    if (this.shadowRoot && topSentinel && !this.isObserving) {
      this.sentinelObs.observe(topSentinel);
      this.sentinelObs.observe(this.shadowRoot.querySelector('.bottom-sentinel')!);
      this.isObserving = true;
    }
  }

  private onHeaderSlot() {
    const slot = this.shadowRoot!.querySelector(`slot[name='header']`)! as HTMLSlotElement;
    this.hasHeader = slot.assignedElements().length > 0;
  }

  private onFooterSlot() {
    const slot = this.shadowRoot!.querySelector(`slot[name='footer']`)! as HTMLSlotElement;
    this.hasFooter = slot.assignedElements().length > 0;
  }

  private onFooterAction(e: MouseEvent) {
    const target = (e.target as HTMLElement);
    const intent = target.getAttribute(INTENT_ATTR);
    const tag = target.tagName;

    if (typeof intent === 'string') {
      emit(this, 'intent', intent || 'success');
    } else if (intent === null && (tag === 'WF-BUTTON' || tag === 'BUTTON' )) {
      emit(this, 'intent', 'cancel');
    }
  }

  render() {

    const footerClasses = {
      available: this.hasFooter,
    };

    return html`
      <article>
        <header class=${classMap({ available: this.hasHeader })}>
          <slot name='header' @slotchange=${this.onHeaderSlot}></slot>
        </header>
        <section>
          <div class='top-shadow' ?active=${this.topShadow && this.hasHeader}></div>
          <div class='content'>
            <div class='top-sentinel'></div>
            <slot></slot>
            <div class='bottom-sentinel'></div>
          </div>
          <div class='bottom-shadow' ?active=${this.bottomShadow && this.hasFooter}></div>
        </section>
        <footer class=${classMap(footerClasses)} @click=${this.onFooterAction}>
          <slot name='footer' @slotchange=${this.onFooterSlot}></slot>
        </footer>
      </article>
    `;
  }

  firstUpdated() {
    this.setupObservation();
    this.onHeaderSlot();
    this.onFooterSlot();
  }
}
