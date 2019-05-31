// import { LitElement, html, property, TemplateResult } from 'lit-element';
// import { render } from 'lit-html';
// import { create, SurfaceCtrl } from '../surface/Service';
// import { setChildren } from '../surface/helper';

// /**
//  * @export
//  * @class Menu
//  * @extends {LitElement}
//  */
// export class MenuList<T = any> extends LitElement {

//   static styles = [];

//   @property()
//   renderer: ((item: T) => TemplateResult) = (item) => html`<div>${item}</div>`;

//   private listCache: Map<T, HTMLElement> = new Map();

//   set items(items: T[]) {
//     this.renderItems(items);
//   }

//   private renderItems(items: T[]) {
//     const newMap = new Map();

//     items.map((item) => {
//       const elm = this.listCache.get(item) || document.createElement('div');

//         render(this.renderer(item), elm);

//         newMap.set(item, elm);
//     });

//     this.listCache = newMap;
//   }

//   render() {
//     return html`
//       <slot></slot>
//     `;
//   }

// }