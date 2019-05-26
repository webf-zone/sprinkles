import { LitElement, html } from 'lit-element';


/**
 * WIP - Work in Progress
 * @export
 * @class Menu
 * @extends {LitElement}
 */
export class Menu extends LitElement {

  static styles = [];


  render() {

    return html`
      <slot></slot>
    `;

  }

}