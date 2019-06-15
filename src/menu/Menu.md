# Menu Component
A menu displays a list of choices on a temporary surface. They appear when users interact with a button, action, or other control.

## Installation
Ensure that you have installed `@webf/sprinkles` package and gone through general guidelines (TBD).

```bash
npm install --save @webf/sprinkles
```

### Registration
Being a web component, menu needs to be registered as a web component. Menu component has a dependency on **surface** and thus it must be registered as well.

```javascript
import * as WF from '@webf/sprinkles';

WF.registerMenu();
WF.registerSurface();
```

## Basic Usage
To use menu, simply drop `<wf-menu>` tag on the page. If you are using **LitElement**, then you can simply use it as:

```html
<wf-menu .renderer=${renderer} .items=${items} @select=${onSelect}>
  <!-- Slotted content acts as the anchor -->
  <button>Open Menu</button>
</wf-menu>
```
Where `renderer`, `items` and `onSelect` are defined as:

``` javascript
import { html } from '@webf/sprinkles';

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
    // e is an custom event object
    console.log(e.detail.label);
  }
```

Child elements passed to menu acts as an `anchor` point for the menu. When this anchor is clicked or activated, then menu is opened and placed on top of it. Ideally it is recommended to use a **single** button, link or any actionable element as an `anchor` element.

## API

### Properties

| Property | Description |
|--------- | ----------- |
| items    | Array of menu items passed to the component. |
| renderer | Function which renders the items in the menu list. It should return **html template result**. |

`items` can be an array of complex object and can be rendered it using `renderer` function with any complex result.

### Events

| Event | Description |
|------ | ----------- |
| select | triggered when user select an item from the menu. |


## More Examples

### Divider and disabled menu
Basic menu with divider and one of the menu item is disabled.

```javascript
import { MENU_DIVIDER } from '@webf/sprinkles';

const movies = [
  { label: 'Avatar' },
  { label: 'Titanic' },

  MENU_DIVIDER,

  // Disabled item
  { label: 'Sully', disabled: true },

  { label: 'The Post' }
];

function renderer(item) {
  return html`
    <div>${ item.label }</div>
  `;
}

// <wf-menu .renderer=${renderer} .items=${items}>
//   <button>Open Menu</button>
// </wf-menu>
```
## TBD Features

  - Support for disabled state
  - Nested/Cascading menu
  - Full style customization
  - `OnScroll` and `OnResize` behavior