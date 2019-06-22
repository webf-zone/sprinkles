import { component, useState } from 'haunted';
import { html } from 'lit-element';
import { MENU_DIVIDER } from '../MenuList';


export const MenuDemo1: any = component(function MenuDemo(this: HTMLElement) {

  const [selected, setSelected] = useState();

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

  function onSelect(e: any) {
    setSelected(e.detail.label);
  }

  return html`
    <wf-menu primary='1'>
      <wf-button .variant=${'unelevated'}>Open</wf-button>
      <wf-menu-list wfId='1' @select=${onSelect} .renderer=${renderer} .items=${items}></wf-menu-list>
    </wf-menu>
    <p>Selected item: ${selected}</p>
  `;

});

customElements.define('wf-menu-demo-1', MenuDemo1);