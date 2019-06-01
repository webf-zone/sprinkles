export type MenuPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export function suggest(anchor: HTMLElement, floatingElm: HTMLElement): MenuPosition {

  let hAlign: 'left' | 'right';
  let vAlign: 'top' | 'bottom';

  // Viewport width
  const vWidth = window.innerWidth;

  // Viewport height
  const vHeight = window.innerHeight;

  // Floating element width
  const fWidth = floatingElm.offsetWidth;

  const { left, top } = anchor.getBoundingClientRect();

  // Get relative left and top
  const rLeft = left / vWidth;
  const rTop = top / vHeight;

  // Far right should always be right aligned
  // Otherwise, calculate values depending upon width
  hAlign = rLeft > 0.85 ? 'right' : (left + fWidth < vWidth ? 'left' : 'right');
  vAlign = rTop > 0.60 ? 'bottom' : 'top';

  return `${vAlign}-${hAlign}` as MenuPosition;
}

export function getFixedPixels(anchor: HTMLElement, position: MenuPosition) {

  const vWidth = window.innerWidth;
  const vHeight = window.innerHeight;
  const { left, top, right, bottom } = anchor.getBoundingClientRect();

  switch (position) {

    case 'top-left': {
      const maxHeight = `${vHeight - top - 32}px`;

      return { top: `${top}px`, left: `${left}px`, maxHeight };
    }
    case 'top-right': {
      const rightVal = vWidth - right;
      const maxHeight = `${vHeight - top - 32}px`;

      return { top: `${top}px`, right: `${rightVal}px`, maxHeight };
    }

    case 'bottom-left': {
      const bottomVal = vHeight - bottom;
      const maxHeight = `${bottom - 32}px`;

      return { bottom: `${bottomVal}`, left: `${left}px`, maxHeight };
    }

    case 'bottom-right': {
      const rightVal = vWidth - right;
      const bottomVal = vHeight - bottom;
      const maxHeight = `${bottom - 32}px`;

      return { bottom: `${bottomVal}px`, right: `${rightVal}px`, maxHeight };
    }
  }
}
