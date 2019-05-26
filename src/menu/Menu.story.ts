import { storiesOf } from '@storybook/html';
import { html, render } from 'lit-html';

// SUT
import notes from './Menu.md';
import { Menu } from './Menu';

storiesOf('Menu', module)
  .addParameters({ notes })
  .add('Basic', () => {

    const rootElm = document.createDocumentFragment();

    const template = (data: any) => html`
      <div>
        <wf-menu>
          <wf-menu-anchor slot="anchor">Food options</wf-menu-anchor>
          <wf-menu-item>Fish</wf-menu-item>
          <wf-menu-item>Chicken</wf-menu-item>
          <wf-menu-item>Vegetable Salad</wf-menu-item>
          <wf-menu-item>Indian curry + Rice</wf-menu-item>
        </wf-menu>
      </div>
    `;

    // Render using lit-html
    render(template({ }), rootElm);

    return rootElm;
  });