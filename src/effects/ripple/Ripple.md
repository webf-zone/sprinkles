# Ripple Effect

`<wf-surface-ripple>` provides the JavaScript and CSS required to provide component with a **water ripple** interaction effect.

## Installation
Ensure that you have installed `@webf/sprinkles` package and gone through general guidelines (TBD).

```bash
npm install --save @webf/sprinkles
```

### Registration
Being a web component, ripple effect needs to be registered as a web component.

```javascript
import * as WF from '@webf/sprinkles';

WF.registerSurfaceRipple();
```

## Basic Usage

A ripple can be applied to a variety of elements to represent interactive surfaces. To use ripple effect on your component, simply put it in the `<wf-surface-ripple>` tag. If you are using **LitElement**, then you can simply use it as:

```html
<wf-surface-menu>
  <!--component on which ripple effect needs to be applied -->
  <button>Open Menu</button>
</wf-surface-menu>
```

## Example

```html
import { html } from '@webf/sprinkles';

  return html`
    <style>
      wf-surface-ripple {
        margin: 8px;
        padding: 16px;

        background: #0AAB8A;
      }
    </style>
    <div>
      <h2>Simple buttons - with ripple</h2>
      <wf-surface-ripple>
        <div>Any element can be wrapped in a surface</div>
      </wf-surface-ripple>
    </div>
  `;
```

## TBD Features
- Support for checkboxes and radio buttons.
