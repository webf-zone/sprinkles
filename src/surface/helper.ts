
export function setChildren(parent: HTMLElement, children: HTMLElement[]) {

  while (parent.lastChild) {
    parent.lastChild.remove();
  }

  parent.append(...children);

  // replaceWith not working
  // parent.replaceWith(...nodes);
}