import { storiesOf } from '@storybook/html';
import { html, render } from 'lit-html';


import notes from './banner.md';

storiesOf('BannerElement', module)
  .addParameters({
    notes
  })
  .add('Simple', () => {

    const rootElm = document.createDocumentFragment();

    const clickHandler = () => { render(template({open: false}), rootElm)}

    const template = (data: any) => html`
      <div>
        <wf-banner .openBanner='${data.open}'>
          <span slot="bannerContent">Banner Text</span>
          <button slot="bannerAction">Dismiss<button>
        </wf-banner>
      </div>
      <button @click=${clickHandler}>click</button>
    `;

    // Render using lit-html
    render(template({open: true}), rootElm);

    return rootElm;
  })
  .add('FixedPosition', () => {
    const rootElm = document.createDocumentFragment();

    const template = () => html`
      <div>
        <wf-banner .openBanner='${true}' .fixedPosition='${true}'>
          <span slot="bannerContent">Banner Text</span>
          <button slot="bannerAction">Dismiss<button>
        </wf-banner>
      </div>
    `;

    // Render using lit-html
    render(template(), rootElm);

    return rootElm;
  })