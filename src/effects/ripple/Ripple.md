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

A ripple can be applied to a variety of elements to represent interactive surfaces. To use ripple effect, simply wrap your **HTMLElement** in the `<wf-surface-ripple>` tag. For example:

```html
<wf-surface-ripple>
  <!-- HTMLElement on which ripple effect needs to be applied -->
  <a href='/settings'>SETTINGS</button>
</wf-surface-ripple>
```

## TBD Features
- Different types of triggers, click, keyboard, hover, etc.

