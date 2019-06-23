# Button Component
Buttons allow users to take actions, and make choices, with a single click.

## Installation
Ensure that you have installed `@webf/sprinkles` package and gone through general guidelines (TBD).

```bash
npm install --save @webf/sprinkles
```

### Registration
Before you can use it, **button** needs to be registered as a web component. Button component is heavily based on the [material design](https://material.io/design/components/buttons.html#). Sprinkle's `<wf-button>` is simply a web-component wrapper around the material button.

```javascript
import * as WF from '@webf/sprinkles';

WF.registerButton();
```

## Basic Usage
To use button, simply drop `<wf-button>` tag on the page:

```html
<wf-button></wf-button>
```

### Variant

`<wf-button>` has many variants, such as **outlined**, **raised**, etc. It can specified using `variant` property. Varient is used to specify emphasis level of the action as per Material design guidelines.

```html
<wf-button .variant=${'outlined'}>Open</wf-button>
<wf-button .variant=${'unelevated'}>Open</wf-button>
<wf-button .variant=${'raised'}>Open</wf-button>
```

## API

| Property | Description | Values  | Default value |
|--------- | ----------- | ------- | ------------- |
| variant | `string`, Represents the style varient of a button | `text`, `outlined`, `unelevated`, `raised` | `text` |
| disabled | `boolean`. Represents the state of the button | - | `true` |
| type | `string`. Submit, reset or a normal button | `submit`, `button`, `reset` | `button` |

## Style Customization

### CSS Properties

| Property | Description | Values  | Default value |
|--------- | ----------- | ------- | ------------- |
| `--button-outline-width` | Border width for `outlined` buttons | any pixel values | `2px` |
| `--button-radius` | Border radisu for buttons | - | `4px` |
| `--button-color` | Primary color | - | `#0AAB8A` |
| `--button-ink` | Secondary accent color | - | `#FFFFFF` |

_Note:_ In case of `text` and `outlined` variants, `--button-color` is the color of the text; `--button-ink` has no effect. For `unelevated` and `raised` variants, `--button-color` is used for **background-color** whereas `--button-ink` is used for text color.