# Menu Component

Dropdown Menus is an important part of the website. Menu appears when users interacts with action controller such as buttons.

## Using the `<wf-menu>`
`<wf-menu>` is a menu panel containing list of options.
`<wf-menu>` does not render by itself. To render the `wf-menu` we need to provide `item` property which will provide the list of menu options to be render and the `renderer` property which is nothing but the function which is used to render the list of options.

`<wf-menu>` internally depends upon the `<wf-overlay>` component.

``` javascript
<wf-menu .renderer=${renderer} .items=${items}>
  <button>Open Menu</button>
</wf-menu>
```
We can also bind the `@select` event on the `<wf-menu>` in order to get the selected value.

``` javascript
<wf-menu @select={onSelect} .renderer=${renderer} .items=${items}>
  <button>Open Menu</button>
</wf-menu>
```

Putting all together

``` javascript
const items = [
    { label: 'Passionfruit' },
    { label: 'Orange' },
    { label: 'Guava' },
    { label: 'Apple' },
    { label: 'Mango' },
    { label: 'Papaya' },
    { label: 'Watermelon' }
  ];

  function renderer(item) {
    return html`
      <div>${ item.label }</div>
    `;
  }

  function onSelect(e) {
    setSelected(e.detail.label);
  }

  return html`
    <wf-menu @select=${onSelect} .renderer=${renderer} .items=${items}>
      <button>Open Menu</button>
    </wf-menu>
    <p>Selected item: ${selected}</p>
  `;
});
```

## API

``` javascript
import { registerMenu, registerSurface } from '@webf/sprinkles';
```

### Register the menu component
``` javascript
registerMenu();
registerSurface();
```

### Properties

| Property | Description   |
|--------- | --------------|
| items    | Menu items passed to the component. Generally consists of array of objects.|
| renderer | Function which renders the items in the menu list.|


## Examples

Basic Menu

```javascript
const items = [
    { label: 'Rock' },
    { label: 'Paper' },
    { label: 'Scissor', disabled: true }
  ];

function renderer(item) {
  return html`
    <div>${ item.label }</div>
  `;
}

<wf-menu .renderer=${renderer} .items=${items}>
  <button>Open Menu</button>
</wf-menu>
```

Basic menu with divider

```javascript
import { MENU_DIVIDER } from '@webf/sprinkles';

const movies = [
  { label: 'Avatar' },
  { label: 'Titanic' },
  MENU_DIVIDER,
  { label: 'Sully' },
  { label: 'The Post' }
];

function renderer(item) {
  return html`
    <div>${ item.label }</div>
  `;
}

<wf-menu .renderer=${renderer} .items=${items}>
  <button>Open Menu</button>
</wf-menu>
```

Menu with icons

```javascript
const movies = [
  { label: 'Avatar', imgSrc: 'src/to/img1' },
  { label: 'Titanic', imgSrc: 'src/to/img2' },
  { label: 'Sully', imgSrc: 'src/to/img3' },
  { label: 'Forest Gump', imgSrc: 'src/to/img3' }
];

function renderer(item) {
  return html`
    <div>
      <img src="item.imgsrc"/>
      <span>${ item.label }</span>
    </div>
  `;
}

<wf-menu .renderer=${renderer} .items=${items}>
  <button>Open Menu</button>
</wf-menu>
```