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