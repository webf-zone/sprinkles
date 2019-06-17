import { LitElement, html, unsafeCSS, property } from 'lit-element';
import { tween, styler, easing, ColdSubscription } from 'popmotion';

import style from './Ripple.scss';

export class Ripple extends LitElement {

  static styles = [unsafeCSS(style)];

  @property({ type: Boolean, reflect: true })
  public disabled: boolean = false;

  public anySubscription?: ColdSubscription;

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener('click', (e: MouseEvent) => {

      if (this.disabled) {
        return;
      }

      const { left, top } = this.getBoundingClientRect();

      // Distance of the event click from the surface's padding edge
      const evX = e.pageX - (left + window.scrollX);
      const evY = e.pageY - (top + window.scrollY);

      this.initiateRipple(evX, evY);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.stopRipple();
  }

  initiateRipple(evX: number, evY: number) {
    // (evX, evY): Distance of the event click from the surface's padding edge
    // Only make sense in case of mouse event. For keyboard based events, it should be the center of the element.

    const circle = this.shadowRoot!.querySelector('.circle')!;
    const circleStyler = styler(circle);

    // Width and Height of the surface
    const width = this.offsetWidth;
    const height = this.offsetHeight;

    // Distance of the event click from the center of the surface
    const offsetX = Math.abs((width / 2) - evX);
    const offsetY = Math.abs((height / 2) - evY);

    // Calculate the distance of the furthest point
    const deltaX = (width / 2) + offsetX;
    const deltaY = (height / 2) + offsetY;

    // Use pythagorous theorem to calcuate actual distance
    const scaleRatio = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

    // console.log('Dimensions', width, height, 'Click', evX, evY, 'Distance', deltaX, deltaY, scaleRatio);

    // Initiate an animation
    const action = tween({
      from: {
        originX: 0.5,
        originY: 0.5,
        x: evX,
        y: evY,
        opacity: 1,
        scale: 1,
      },
      to: {
        x: evX,
        y: evY,
        originX: 0.5,
        originY: 0.5,
        scale: scaleRatio,
        opacity: 0,
      },
      duration: 400,
      ease: easing.easeOut
    });

    this.anySubscription = action.start({
      update: (v: any) => circleStyler.set(v),
      complete: () => this.stopRipple()
    });
  }

  stopRipple() {
    this.anySubscription && this.anySubscription.stop();
    this.anySubscription = undefined;
  }

  render() {
    return html`
      <svg class='shape' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>
        <defs>
          <radialGradient id='gradient'>
            <stop class='stop-1' stop-opacity='0.6' offset='0' />
            <stop class='stop-2' stop-opacity='0.6' offset='0.25' />
            <stop class='stop-3' stop-opacity='0.6' offset='0.35' />
            <stop class='stop-4' stop-opacity='0.6' offset='0.50' />
            <stop class='stop-5' stop-opacity='0.6' offset='0.60' />
            <stop class='stop-6' stop-opacity='0.6' offset='0.85' />
            <stop class='stop-7' stop-opacity='0.6' offset='1' />
          </radialGradient>
        </defs>
        <!-- <rect class='circle' fill='url(#gradient)' x='1' y='1' width='2' height='2' /> -->
        <circle opacity='0' class='circle' fill='url(#gradient)' cx='1' cy='1' r='1' />
      </svg>
      <slot></slot>
    `;
  }
}
