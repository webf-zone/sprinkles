import { component } from 'haunted';
import { html } from 'lit-element';
import { MENU_DIVIDER } from '../MenuList';


export const MenuDemo: any = component(function MenuDemo(this: HTMLElement) {

  const items = [
    { label: 'Passionfruit' },
    { label: 'Orange' },
    { label: 'Guava' },
    { label: 'Apple' },
    MENU_DIVIDER,
    { label: 'Mango' },
    { label: 'Papaya', disabled: true },
    { label: 'Watermelon' }
  ];

  function renderer(item: any) {
    return html`
      <div>${ item.label }</div>
    `;
  }

  return html`
    <wf-menu .renderer=${renderer} .items=${items}>
      <button>Open Menu</button>
    </wf-menu>
    <p>Selected item: </p>
  `;

});

customElements.define('wf-menu-demo-1', MenuDemo);