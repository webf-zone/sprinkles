import { CSSResult } from 'lit-element';

import { Banner } from './banner/banner';
import { Button } from './button/Button';
import { Menu } from './menu/Menu';
import { MenuList } from './menu/MenuList';
import { MenuItem } from './menu/MenuItem';
import { MultiSelect } from './multiselect/multiselect';
import { Overlay } from './surface/Overlay';

export function registerBanner(styles: CSSResult[]) {
  // LitElement is piggy backing on observedAttributes to generate CSS
  Banner.styles = Banner.styles.concat(styles);

  customElements.define('wf-banner', Banner);
}

export function registerButton() {
  customElements.define('wf-button', Button);
}

export function registerMenu() {
  customElements.define('wf-menu-list', MenuList);
  customElements.define('wf-menu-item', MenuItem);
  customElements.define('wf-menu', Menu);
}

export function registerMultiSelect() {
  customElements.define('wf-multiselect', MultiSelect);
}

export function registerSurface() {
  customElements.define('wf-overlay', Overlay);
}
