import { LitElement, html, unsafeCSS, property } from 'lit-element';

import style from './DialogRenderer.scss';

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

  private onHeader() {
    const slot = this.shadowRoot!.querySelector(`slot[name='header']`)! as HTMLSlotElement;

    this.hasHeader = slot.assignedElements().length > 0;
  }

  private onFooter() {
    const slot = this.shadowRoot!.querySelector(`slot[name='footer']`)! as HTMLSlotElement;

    this.hasFooter = slot.assignedElements().length > 0;
  }

  render() {
    return html`
      <article>
        <header>
          <slot name='header' @slotchange=${this.onHeader}></slot>
        </header>
        <div class='wrapper'>
          <section>
            <div class='top-shadow' ?active=${this.topShadow && this.hasHeader}></div>
            <div class='top-sentinel'></div>
            <slot></slot>
            <div class='bottom-sentinel'></div>
          </section>
          <div class='bottom-shadow' ?active=${this.bottomShadow && this.hasFooter}></div>
        </div>
        <footer>
        </footer>
        <slot name='footer' @slotchange=${this.onFooter}></slot>
      </article>
    `;
  }

  firstUpdated() {
    this.setupObservation();
    this.onHeader();
    this.onFooter();
  }
}
