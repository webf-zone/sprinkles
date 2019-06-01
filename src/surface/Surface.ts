import Popper from 'popper.js';

import { Overlay } from './Overlay';
import { setChildren } from './helper';

export class Surface {

  // z-index of the overlay
  layer: number = 0;

  // Actual Overlay web component
  overlay: Overlay = document.createElement('wf-overlay') as Overlay;

  // All the child nodes
  elms: HTMLElement[] = [];

  show(layer: number) {

    // Set to the created overlay
    this.overlay.zIndex = this.layer = layer;

    // Append the overlay to the body.
    document.body.appendChild(this.overlay);
  };

  dismiss() {
    document.body.removeChild(this.overlay);
  }

  children(nodes: HTMLElement[]) {
    setChildren(this.overlay, nodes);
  }

}
