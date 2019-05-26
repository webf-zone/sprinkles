import { LitElement, html, property, css } from 'lit-element';

export class Overlay extends LitElement {

  static styles = [
    css`
      :host {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    `
  ];

  @property({})
  public nodes: HTMLElement[] = [];

  @property({})
  public zIndex: number = 1;

  public render() {
    return html`
      <style>
        :host { z-index: ${this.zIndex}; }
      </style>
      ${this.nodes}
    `;
  }

}
