export function emit<T>(element: HTMLElement, name: string, data?: T, opts: CustomEventInit = {}) {

  const event = new CustomEvent(name, {
    ...opts,
    detail: data
  });

  element.dispatchEvent(event);
}

export function applyStyle(elm: HTMLElement, style: Partial<CSSStyleDeclaration>, previousStyles: Partial<CSSStyleDeclaration> = {}) {

  for (const [key, _value] of Object.entries(previousStyles)) {
    elm.style.removeProperty(key)
  }

  for (const [key, value] of Object.entries(style)) {
    elm.style[key as any] = value;
  }
}

export function promisor<T>(): [Promise<T>, (value?: T) => void, (reason?: any) => void] {

  let resolver, rejector;

  const promise = new Promise<T>((resolve, reject) => {
    resolver = resolve;
    rejector = reject;
  });

  return [promise, resolver as any, rejector as any];

}