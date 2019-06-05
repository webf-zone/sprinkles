
export interface ScrollEventMgr {
  on: (handler: (e: Event) => void) => void;
  off: () => void;
}

export function listenScroll(elm: HTMLElement | Document | Window = window): ScrollEventMgr {

  let ticking: boolean = false;
  let handler: undefined | ((e: Event) => void);
  let pendingWork: number = 0;

  const innerHandler = (e: Event) => {

    if (!ticking && handler) {

      // Throttle scroll event
      pendingWork = window.requestAnimationFrame(() => {
        handler!(e);
        ticking = false;
        pendingWork = 0;
      });

      ticking = true;
    }
  };

  const on = (eventHandler: (e: Event) => void) => {
    // Only one event handler at a time.
    if (!handler) {
      handler = eventHandler;
      elm.addEventListener('scroll', innerHandler);
    }
  };

  const off = () => {
    if (handler) {
      window.cancelAnimationFrame(pendingWork);
      elm.removeEventListener('scroll', handler);
      handler = undefined;
    }
  }

  return { on, off };
}
