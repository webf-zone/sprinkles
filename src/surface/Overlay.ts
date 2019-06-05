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
        pointer-events: none;
      }

      .backdrop {
        pointer-events: all;
        background-color: rgba(0, 0, 0, 0.02);

        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
    `
  ];

  @property({})
  public zIndex: number = 1;

  public layout() {
    this.performUpdate();
  }

  public render() {

    return html`
      <style>
        :host { z-index: ${this.zIndex}; }
      </style>
      <div class='backdrop'></div>
      <slot></slot>
    `;
  }

}
