export function emit<T>(element: HTMLElement, name: string, data?: T) {

  const event = new CustomEvent(name, {
    detail: data
  });

  element.dispatchEvent(event);
}