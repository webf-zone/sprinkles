import { CSSResult } from 'lit-element';

import { Banner } from './banner/banner';
import { Button } from './button/Button';
import { Dialog } from './dialog/Dialog';
import { DialogRenderer } from './dialog/DialogRenderer';
import { Bullet } from './effects/bullet/Bullet';
import { Ripple } from './effects/ripple/Ripple';
import { Menu } from './menu/Menu';
import { MenuItem } from './menu/MenuItem';
import { MenuList } from './menu/MenuList';
import { MenuListRenderer } from './menu/MenuListRenderer';
import { MultiSelect } from './multiselect/multiselect';
import { Overlay } from './surface/Overlay';

// Re-exports
export { html } from 'lit-element';
export { MENU_DIVIDER } from './menu/MenuList';

export function registerBanner(styles: CSSResult[]) {
  // LitElement is piggy backing on observedAttributes to generate CSS
  Banner.styles = Banner.styles.concat(styles);

  customElements.define('wf-banner', Banner);
}

export function registerButton() {
  customElements.define('wf-button', Button);
}

export function registerDialog() {
  customElements.define('wf-dialog', Dialog);
  customElements.define('wf-dialog-renderer', DialogRenderer);
}

export function registerMenu() {
  customElements.define('wf-menu', Menu);
  customElements.define('wf-menu-item', MenuItem);
  customElements.define('wf-menu-list', MenuList);
  customElements.define('wf-menu-list-renderer', MenuListRenderer);
}

export function registerMultiSelect() {
  customElements.define('wf-multiselect', MultiSelect);
}

export function registerSurface() {
  customElements.define('wf-overlay', Overlay);
}

export function registerSurfaceRipple() {
  customElements.define('wf-surface-ripple', Ripple);
}

export function registerSurfaceBullet() {
  customElements.define('wf-surface-bullet', Bullet);
}