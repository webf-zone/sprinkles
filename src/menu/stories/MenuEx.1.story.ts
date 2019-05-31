import { component } from 'haunted';
import { html } from 'lit-element';


export const MenuDemo: any = component(function MenuDemo(this: HTMLElement) {

  const items = [
    { label: 'Passionfruit' },
    { label: 'Orange' },
    { label: 'Guava' },
    { label: 'Apple' },
    { label: 'Mango' },
    { label: 'Papaya' },
  ];

  function renderer(item: typeof items[0]) {
    return html`
      <div>${ item.label }</div>
    `;
  }

  return html`
    <wf-menu .renderer=${renderer} .items=${items}>
      <button>Open Menu</button>
    </wf-menu>
  `;

});

customElements.define('wf-menu-demo-1', MenuDemo);