import { Surface } from './Surface';
import { Overlay } from './Overlay';

export interface SurfaceCtrl {
  overlay: Overlay;
  backdrop: HTMLElement;
  show: () => void;
  dismiss: () => void;
  children: (nodes: HTMLElement[]) => void;
}

// Array `surfaces` is a queue acting as a singleton and thus mutable.
const surfaces: Surface[] = [];

export function create() {

  const surface = new Surface();

  // Force the rendering
  surface.overlay.layout();

  const control: SurfaceCtrl = {
    overlay: surface.overlay,
    backdrop: surface.overlay.shadowRoot!.querySelector('.backdrop') as any,
    show, dismiss, children };

  function show() {

    const layer = surfaces.length === 0 ? 100 : surfaces[surfaces.length - 1].layer + 1;

    surface.show(layer);
    surfaces.push(surface);
  };

  function dismiss() {

    surface.dismiss();

    const index = surfaces.indexOf(surface);

    if (index > -1) {
      surfaces.splice(index, 1);
    }
  }

  function children(nodes: HTMLElement[]) {
    surface.children(nodes);
  }

  return control;
}
