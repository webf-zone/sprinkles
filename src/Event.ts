
export interface EventMgr {
  on: (handler: (e: Event) => void) => void;
  off: () => void;
}

export function listenScroll(elm?: HTMLElement | Document | Window) {
  return makeThrottler('scroll', elm);
}

export function listenResize() {
  return makeThrottler('resize');
}

export function makeThrottler(eventName: string, elm: HTMLElement | Document | Window = window): EventMgr {

  let handler: undefined | ((e: Event) => void);
  let pendingWork: number = 0;

  const innerHandler = (e: Event) => {

    if (handler) {

      if (pendingWork !== 0) {
        window.cancelAnimationFrame(pendingWork);
      }

      // Throttle scroll event
      pendingWork = window.requestAnimationFrame(() => {
        handler!(e);
        pendingWork = 0;
      });
    }
  };

  const on = (eventHandler: (e: Event) => void) => {
    // Only one event handler at a time.
    if (!handler) {
      handler = eventHandler;
      elm.addEventListener(eventName, innerHandler);
    }
  };

  const off = () => {
    if (handler) {
      window.cancelAnimationFrame(pendingWork);
      elm.removeEventListener(eventName, handler);
      handler = undefined;
    }
  }

  return { on, off };
}
