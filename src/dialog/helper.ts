export function findFocusableItem(currentElm: Element | null): Element | null {
  // Recursively attempt to find currently focused item.
  // Pierce through the shadow dom as much as possible.
  if (currentElm) {
    if (currentElm.shadowRoot) {
      return findFocusableItem(currentElm.shadowRoot.activeElement as Element);
    } else {
      return currentElm;
    }
  } else {
    return null;
  }
}
