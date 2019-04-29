import classnames from 'classnames';
import { LitElement, html, unsafeCSS, property, customElement } from 'lit-element';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function emit(element, name, data) {
    const event = new CustomEvent(name, {
        detail: data
    });
    element.dispatchEvent(event);
}

var style = "* {\n  box-sizing: border-box; }\n\n:host {\n  display: inline-flex; }\n\n.multiselect {\n  position: relative; }\n\n.header {\n  display: flex;\n  flex-wrap: wrap;\n  padding: 0.5rem 1rem;\n  border: 1px solid black;\n  border-radius: 8px; }\n  .header > * {\n    margin-right: 0.5rem; }\n\n.chip {\n  display: flex;\n  padding: 3px 6px;\n  align-items: center;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-radius: 8px; }\n  .chip__text {\n    margin-right: 0.25rem; }\n  .chip__clear {\n    cursor: pointer;\n    fill: gray; }\n\ninput {\n  display: block;\n  border: none;\n  outline: none; }\n\n.content {\n  display: none;\n  position: absolute;\n  width: 100%;\n  left: 0;\n  border: 1px solid black;\n  border-top: none;\n  border-bottom-left-radius: 8px;\n  border-bottom-right-radius: 8px; }\n\n.divider {\n  padding: 0 1rem 0.5rem; }\n\n.no-records {\n  padding: 0 1rem; }\n\n.line {\n  height: 1px;\n  background-color: black; }\n\n.list > li {\n  list-style: none;\n  padding: 0 1rem; }\n  .list > li:hover {\n    background-color: rgba(0, 0, 0, 0.1); }\n\n.multiselect--opened .content {\n  display: block; }\n\n.multiselect--opened .header {\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0;\n  border-bottom: none; }\n";

let MultiSelect = class MultiSelect extends LitElement {
    constructor() {
        super(...arguments);
        this.placeholder = '';
        // Pre-selected item
        this.value = [];
        this.selected = [{ label: 'hello' }];
        this.loading = false;
        this.toText = (val) => val.label;
        // Whether to allow user to select item from multiselect
        this.disabled = false;
        this.opened = false;
    }
    onInputFocus(e) {
        // console.log('Focus', e);
        this.opened = true;
    }
    onInputBlur(e) {
        // console.log('Blur', e);
        this.opened = false;
    }
    onKeyDown(e) {
        // console.log(e);
    }
    onInput(e) {
        emit(this, 'search', e.target.value);
    }
    renderChips(itemsToRender) {
        return itemsToRender.map((x) => html `
      <span class='chip'>
        <span class='chip__text'>${this.toText(x)}</span>
        <svg class='chip__clear' xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'>
          <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/>
          <path d='M0 0h24v24H0z' fill='none'/>
        </svg>
      </span>
    `);
    }
    onClick() {
        console.log('This is good');
    }
    render() {
        const classes = classnames('multiselect', this.opened && 'multiselect--opened');
        // const classes = classnames('multiselect', 'multiselect--opened');
        return html `
      <div class='${classes}'>
        <div class='header'>
          ${this.renderChips(this.selected)}
          <input type='text' placeholder='${this.placeholder}' .disabled='${this.disabled}'
            @focus='${this.onInputFocus}' @blur='${this.onInputBlur}'
            @input='${this.onInput}'
            @keydown='${this.onKeyDown}' />
        </div>
        <div class='content'>
          <div class='divider'>
            <div class='line'></div>
          </div>
          <div class='no-records'>
            <slot name='empty'>No records</slot>
          </div>
          <div class='list' @click='${this.onClick}'>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
          </div>
        </div>
      </div>
    `;
    }
};
MultiSelect.styles = [unsafeCSS(style)];
__decorate([
    property()
], MultiSelect.prototype, "placeholder", void 0);
__decorate([
    property()
], MultiSelect.prototype, "value", void 0);
__decorate([
    property()
], MultiSelect.prototype, "selected", void 0);
__decorate([
    property()
], MultiSelect.prototype, "loading", void 0);
__decorate([
    property()
], MultiSelect.prototype, "toText", void 0);
__decorate([
    property()
], MultiSelect.prototype, "disabled", void 0);
__decorate([
    property()
], MultiSelect.prototype, "opened", void 0);
MultiSelect = __decorate([
    customElement('wf-multiselect')
], MultiSelect);

var style$1 = "* {\n  box-sizing: border-box; }\n\n:host {\n  display: block;\n  --max-width: 100%; }\n\n:host(.fixed) {\n  min-width: 320px;\n  position: fixed;\n  top: 0;\n  left: 0;\n  border: 1px solid rgba(0, 0, 0, 0.24);\n  border-radius: 4px; }\n\n.banner {\n  width: 100%;\n  padding: 0.5rem 0.75rem;\n  display: none;\n  max-width: var(--max-width); }\n  .banner.open {\n    display: flex;\n    flex-direction: column; }\n\n.content {\n  margin-bottom: 0.5rem; }\n\n.action {\n  text-align: right; }\n\n@media screen and (min-width: 767px) {\n  :host(.fixed) {\n    min-width: 640px;\n    left: 50%;\n    transform: translateX(-50%); }\n  .banner.open {\n    flex-direction: row; }\n  .content {\n    margin-bottom: 0;\n    flex-grow: 70; }\n  .action {\n    flex-grow: 30; } }\n";

let BannerElement = class BannerElement extends LitElement {
    constructor() {
        super(...arguments);
        this.open = false;
    }
    set fixed(val) {
        if (val) {
            this.classList.add('fixed');
        }
        else {
            this.classList.remove('fixed');
        }
    }
    render() {
        const classes = classnames('banner', this.open && 'open');
        return html `
      <div class=${classes}>
        <div class='content'>
          <slot></slot>
        </div>
        <div class='action'>
          <slot name='action'></slot>
        </div>
      </div>
    `;
    }
};
BannerElement.styles = [unsafeCSS(style$1)];
__decorate([
    property({ type: Boolean })
], BannerElement.prototype, "open", void 0);
BannerElement = __decorate([
    customElement('wf-banner')
], BannerElement);

export { BannerElement, MultiSelect };
