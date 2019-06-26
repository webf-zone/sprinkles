import { LitElement, html, unsafeCSS, property } from 'lit-element';

import style from './DialogRenderer.scss';

export class DialogRenderer extends LitElement {

  static styles = [unsafeCSS(style)];

  private sentinelObs: IntersectionObserver;

  @property()
  private topShadow: boolean = true;

  @property()
  private bottomShadow: boolean = true;

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

  render() {
    return html`
      <article>
        <header>
          <slot name='header'></slot>
        </header>
        <div class='wrapper'>
          ${this.topShadow ? html`<div class='top-shadow'></div>` : html``}
          <section>
            <div class='top-sentinel'></div>
            <slot></slot>
            <div class='bottom-sentinel'></div>
          </section>
          ${this.bottomShadow ? html`<div class='bottom-shadow'></div>` : html``}
        </div>
        <footer>
        </footer>
        <slot name='footer'></slot>
      </article>
    `;
  }

  firstUpdated() {
    this.setupObservation();
  }
}
