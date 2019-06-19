# Button Component
Buttons allow users to take actions, and make choices, with a single click.

## Installation
Ensure that you have installed `@webf/sprinkles` package and gone through general guidelines (TBD).

```bash
npm install --save @webf/sprinkles
```

### Registration
Being a web component, button needs to be registered as a web component. Button component is heavily based on the [material design](https://material.io/design/components/buttons.html#). It can simply be said that the `<wf-button>` is a web component wrapper around the material button.

```javascript
import * as WF from '@webf/sprinkles';

WF.registerButton();
```

## Basic Usage
To use menu, simply drop `<wf-button>` tag on the page. If you are using **LitElement**, then you can simply use it as:

```html
<wf-button></wf-button>
```

## Varients

`<wf-button>` has many varients, such as **outlined** and **raised** button. These varients can be accessed via `varient` property on the button.

## Varient Example

```html
<wf-button .variant=${'outlined'}>Open</wf-button>
<wf-button .variant=${'unelevated'}>Open</wf-button>
<wf-button .variant=${'raised'}>Open</wf-button>
```
We can also disable the button using `disabled` attribute. It takes an boolean value. To disable the button, attribute must be provided the `true` value. If attribute not provided, button will have a default state.

```html
<wf-button ?disabled=${true}>Open</wf-button>
```

## API

| Property | Description | Values  |
|--------- | ----------- |---------|
|  variant | Represents the varients of button | outlined, unelevated, raised |
| ?disabled| Represents State of the button| true, false|


