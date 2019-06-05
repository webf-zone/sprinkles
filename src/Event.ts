
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

  let pendingWork: number = 0;
  const mgr = listen(eventName, elm);

  function decorateHandler(handler: (e: Event) => void) {

    return function innerHandler(e: Event) {
      if (pendingWork !== 0) {
        window.cancelAnimationFrame(pendingWork);
      }

      // Throttle scroll event
      pendingWork = window.requestAnimationFrame(() => {
        handler(e);
        pendingWork = 0;
      });
    };

  }

  const on = (handler: (e: Event) => void) => {
    mgr.on(decorateHandler(handler));
  };

  const off = () => {
    window.cancelAnimationFrame(pendingWork);
    mgr.off();
  }

  return { on, off };
}

export function listen(eventName: string, elm: HTMLElement | Document | Window = window): EventMgr {

  let handler: undefined | ((e: Event) => void);

  const on = (eventHandler: (e: Event) => void) => {
    // Only one event handler at a time.
    if (!handler) {
      handler = eventHandler;
      elm.addEventListener(eventName, handler);
    } else {
      console.warn('Attempt to add multiple event handler');
    }
  };

  const off = () => {
    if (handler) {
      elm.removeEventListener(eventName, handler);
      handler = undefined;
    }
  }

  return { on, off };
}
