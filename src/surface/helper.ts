
/**
 *
 * Takes a list of children and attach it to parent.
 * Before attaching, remove existing children.
 * @param {HTMLElement} parent
 * @param {HTMLElement[]} children
 */
export function setChildren(parent: HTMLElement, children: HTMLElement[]) {

  while (parent.lastChild) {
    parent.lastChild.remove();
  }

  parent.append(...children);

  // replaceWith not working
  // parent.replaceWith(...nodes);
}