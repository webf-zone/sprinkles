import { component, useState } from 'haunted';
import { html } from 'lit-element';
import { MENU_DIVIDER, MenuListItem, Divider } from '../MenuList';


export const MenuDemo3: any = component(function MenuDemo(this: HTMLElement) {

  const [selected, setSelected] = useState();
  const [position, setPosition] = useState('top-left');

  const primary: MenuListItem[] = [
    { label: 'Fruits', triggerFor: '2' },
    { label: 'Beverages', triggerFor: '3' }
  ];

  const fruits: MenuListItem[] = [
    { label: 'Seasonal', triggerFor: '4' },
    { label: 'All time', triggerFor: '5' },
    { label: 'Exotic Dragonfruit' },
  ];

  const beverages: MenuListItem[] = [
    { label: 'Alcoholic', triggerFor: '6' },
    { label: 'Non-alcoholic', triggerFor: '10' }
  ];

  const seasonal: MenuListItem[] = [
    { label: 'Passionfruit' },
    { label: 'Guava' },
    { label: 'Mango' },
    { label: 'Watermelon' }
  ];

  const allTime: (MenuListItem | Divider)[] = [
    { label: 'Orange' },
    { label: 'Apple' },
    MENU_DIVIDER,
    { label: 'Papaya', disabled: true },
    { label: 'Banana' },
  ];


  const alcoholic: MenuListItem[] = [
    { label: 'Regular', triggerFor: '7' },
    { label: 'Wine', triggerFor: '8' },
    { label: 'On the rock', triggerFor: '9' }
  ];

  const regular: MenuListItem[] = [
    { label: 'Beer' },
    { label: 'Rum' },
    { label: 'Brandy' },
    { label: 'Gin' }
  ];

  const wines: MenuListItem[] = [
    { label: 'Red wine' },
    { label: 'White wine' },
    { label: 'Fruit wine' },
    { label: 'Sparkling wine', disabled: true }
  ];

  const onTheRock: (MenuListItem | Divider)[] = [
    { label: 'Premium Scotch' },
    MENU_DIVIDER,
    { label: 'Amrut 60 years' },
    MENU_DIVIDER,
    { label: 'No. 1 whisky' },
  ];

  const nonAlcoholic: MenuListItem[] = [
    { label: 'Coco-cola' },
    { label: 'Diet coke' },
    { label: 'Vanilla milkshake' },
    { label: 'Black current smoothie' },
    { label: 'Banana milkshake' },
    { label: 'Sweet lemon juice' },
    { label: 'Punjabi Lassi' },
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

    <style>
      h1 { margin-top: 4rem; }
      wf-menu { position: fixed; }
      .menu-anchor { --button-color: #239EDE; font-weight: bolder; }
      .top-left { top: 1rem; left: 1rem; }
      .top-right { top: 1rem; right: 1rem; }
      .bottom-right { bottom: 1rem; right: 1rem; }
      .bottom-left { bottom: 1rem; left: 1rem; }
      .center { top: 50%; left: 50%; transform: translate(-50%, -50%); }
    </style>

    <h1>Nested Menu</h1>
    <p>Try this example with responsive device (320px vs 480px)</p>
    <wf-button .variant=${'unelevated'} @click=${() => setPosition('top-left')} >Top Left</wf-button>
    <wf-button .variant=${'unelevated'} @click=${() => setPosition('top-right')} >Top Right</wf-button>
    <wf-button .variant=${'unelevated'} @click=${() => setPosition('bottom-right')} >Bottom Right</wf-button>
    <wf-button .variant=${'unelevated'} @click=${() => setPosition('bottom-left')} >Bottom Left</wf-button>
    <wf-button .variant=${'unelevated'} @click=${() => setPosition('center')} >Center</wf-button>

    <wf-menu class=${position} primary='1'>
      <wf-button class='menu-anchor' .variant=${'raised'}>OPEN MENU</wf-button>
      <wf-menu-list wfId='1' @select=${onSelect} .renderer=${renderer} .items=${primary}></wf-menu-list>
      <wf-menu-list wfId='2' @select=${onSelect} .renderer=${renderer} .items=${fruits}></wf-menu-list>
      <wf-menu-list wfId='3' @select=${onSelect} .renderer=${renderer} .items=${beverages}></wf-menu-list>
      <wf-menu-list wfId='4' @select=${onSelect} .renderer=${renderer} .items=${seasonal}></wf-menu-list>
      <wf-menu-list wfId='5' @select=${onSelect} .renderer=${renderer} .items=${allTime}></wf-menu-list>
      <wf-menu-list wfId='6' @select=${onSelect} .renderer=${renderer} .items=${alcoholic}></wf-menu-list>
      <wf-menu-list wfId='7' @select=${onSelect} .renderer=${renderer} .items=${regular}></wf-menu-list>
      <wf-menu-list wfId='8' @select=${onSelect} .renderer=${renderer} .items=${wines}></wf-menu-list>
      <wf-menu-list wfId='9' @select=${onSelect} .renderer=${renderer} .items=${onTheRock}></wf-menu-list>
      <wf-menu-list wfId='10' @select=${onSelect} .renderer=${renderer} .items=${nonAlcoholic}></wf-menu-list>
    </wf-menu>
    <p>Selected item: ${selected}</p>
  `;

});

customElements.define('wf-menu-demo-3', MenuDemo3);