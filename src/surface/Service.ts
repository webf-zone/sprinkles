import { Surface } from './Surface';

export interface SurfaceCtrl {
  show: () => void;
  dismiss: () => void;
  children: (nodes: HTMLElement[]) => void;
}

// Array `surfaces` is a queue acting as a singleton and thus mutable.
const surfaces: Surface[] = [];

export function create() {

  const surface = new Surface();
  const control: SurfaceCtrl = { show, dismiss, children };

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
