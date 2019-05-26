import { Overlay } from './Overlay';

interface Surface {
  readonly layer: number;
  readonly overlay: HTMLElement;
}

// Array `surfaces` is a queue acting as a singleton and thus mutable.
const surfaces: Surface[] = [];
const surfaceId = Symbol();

export function create() {

  // 1. Create an overlay component
  // 2. Take optional nodes during creation.
  // 3. Return a data structure that will enable
  //    - Showing the overlay on the page
  //    - Removing the overlay
  //    - Change child nodes
  // 4. Destroy the overlay

  const overlay = document.createElement('wf-overlay') as Overlay;

  const controller = {
    show, dismiss, children,
    [surfaceId]: null as any as Surface
  };

  function show() {

    const layer = surfaces.length === 0 ? 100 : surfaces[surfaces.length - 1].layer + 1;
    const surface: Surface = { layer, overlay };

    controller[surfaceId] = surface;
    surfaces.push(surface);

    // Set to the created overlay
    overlay.zIndex = layer;

    // Append the overlay to the body.
    document.body.appendChild(overlay);
  };

  function dismiss() {
    document.body.removeChild(overlay);

    const surface = controller[surfaceId];
    const index = surfaces.indexOf(surface);

    if (index > -1) {
      surfaces.splice(index, 1);
    }
  }

  function children(nodes: HTMLElement[]) {
    overlay.nodes = nodes;
  }

  return controller;

}
