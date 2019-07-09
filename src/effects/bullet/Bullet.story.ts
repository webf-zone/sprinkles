import { storiesOf } from '@storybook/html';
import { component } from 'haunted';
import { html } from 'lit-element';

import notes from './Bullet.md';

export const BulletDemo: any = component(function BulletDemo(this: HTMLElement) {

  return html`
    <wf-surface-bullet></wf-surface-bullet>
  `;
});

customElements.define('wf-surface-bullet-demo', BulletDemo);


storiesOf('Effects|Bullet', module)
  .addParameters({ notes })
  .add('Basic', () => new BulletDemo());
