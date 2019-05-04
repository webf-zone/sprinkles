import { CSSResult } from 'lit-element';

import { Banner } from './banner/banner';
import { Explorer } from './explorer/explorer';
import { MultiSelect } from './multiselect/multiselect';

export function registerBanner(styles: CSSResult[]) {

  // LitElement is piggy backing on observedAttributes to generate CSS
  Banner.styles = Banner.styles.concat(styles);

  customElements.define('wf-banner', Banner);
}

export function registerExplorer(styles: CSSResult[]) {
  Explorer.styles =  Explorer.styles.concat(styles);

  customElements.define('wf-explorer', Explorer);
}

export function registerMultiSelect() {
  customElements.define('wf-multiselect', MultiSelect);
}
