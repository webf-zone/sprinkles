import Popper from 'popper.js';

import { Overlay } from './Overlay';

interface SurfaceChild {
  elm: HTMLElement;

  anchor: HTMLElement;
  popper?: Popper;
}

interface Surface {

  // z-index of the overlay
  layer: number;

  // Actual Overlay web component
  overlay: Overlay;

  // All the child nodes
  elms?: HTMLElement[];

  // Functions
  show: () => void;
  dismiss: () => void;
  children: (nodes: HTMLElement[]) => void;
}

// Array `surfaces` is a queue acting as a singleton and thus mutable.
const surfaces: Surface[] = [];

export function create() {

  const overlay = document.createElement('wf-overlay') as Overlay;

  const surface: Surface = {

    layer: 0,
    overlay,
    elms: [],

    show, dismiss, children
  };


  function show() {

    const layer = surfaces.length === 0 ? 100 : surfaces[surfaces.length - 1].layer + 1;

    surface.layer = layer;

    surfaces.push(surface);

    // Set to the created overlay
    overlay.zIndex = layer;

    // Append the overlay to the body.
    document.body.appendChild(overlay);
  };

  function dismiss() {

    document.body.removeChild(overlay);

    const index = surfaces.indexOf(surface);

    if (index > -1) {
      surfaces.splice(index, 1);
    }
  }

  function children(nodes: HTMLElement[]) {

    while (overlay.lastChild) {
      overlay.lastChild.remove();
    }

    overlay.append(...nodes);

    // replaceWith not working
    // overlay.replaceWith(...nodes);
  }

  return surface;
}
