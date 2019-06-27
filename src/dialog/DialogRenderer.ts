import { LitElement, html, unsafeCSS, property } from 'lit-element';

import style from './DialogRenderer.scss';

export class DialogRenderer extends LitElement {

  static styles = [unsafeCSS(style)];

  private sentinelObs: IntersectionObserver;

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
  }

  disconnectedCallback() {
    this.sentinelObs.disconnect();
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
    this.sentinelObs.observe(this.shadowRoot!.querySelector('.top-sentinel')!);
    this.sentinelObs.observe(this.shadowRoot!.querySelector('.bottom-sentinel')!);
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
