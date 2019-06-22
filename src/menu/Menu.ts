import { css, LitElement, html, unsafeCSS, property } from 'lit-element';

import { listenScroll, listenResize, listen, EventSubscriber } from '../Event';
import { create, SurfaceCtrl } from '../surface/Service';

const style = css`:host {
  display: inline-flex;
}`;

import { MenuList } from './MenuList';
import { MenuListRenderer } from './MenuListRenderer';

/**
 * @export
 * @class Menu
 * @extends {LitElement}
 */
export class Menu<T> extends LitElement {

  static styles = [unsafeCSS(style)];

  @property({ type: String, reflect: true })
  public primary: string = '';

  private surfaceCtrl: SurfaceCtrl = create();

  private state: 'normal' | 'opening' | 'opened' | 'closing' | 'closed' = 'normal';

  // Global events
  private scrollSub = listenScroll();
  private resizeSub = listenResize();

  private backdropSub = listen('click', this.surfaceCtrl.backdrop);
  private keydownSub = listen('keydown', this.surfaceCtrl.overlay);

  private renderTree: Array<{
    item: MenuList<T>;
    events: EventSubscriber[];
    requester?: MenuListRenderer<T>;
  }> = [];

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener('click', () => this.openMenu());

    // Listen for global events like scroll and resize
  }

  disconnectedCallback() {
    this.dismissMenu();
  }

  private async drawList(listId: string, anchor: HTMLElement, requester?: MenuListRenderer<T>) {

    const list = this.aquireListForId(listId);

    if (!list) {
      throw new Error(`WF: List with id: ${listId} not found`);
    } else if (this.isListAlreadyOpen(listId)) {
      return;
    }

    const listenSub = listen('select', list.listEl);
    const openSub = listen('open', list.listEl);
    const dismissCurrentSub = listen('dismissCurrent', list.listEl);

    list.overlapping = this.renderTree.length === 0;

    this.renderTree.push({
      requester,
      item: list,
      events: [ listenSub, openSub, dismissCurrentSub ]
    });

    const renderList = this.renderTree.map((x) => x.item.listEl);
    this.surfaceCtrl.children(renderList);

    await list.open(anchor);

    listenSub.on(() => this.dismissMenu());

    openSub.on((e: CustomEvent) => {
      // Check if any other sub-list already opened from the requesting list
      const siblingSublist = this.findSublistForRequester(e.target as any);

      if (siblingSublist && siblingSublist.item.wfId === e.detail.listId) {
        return;
      }

      // If yes, then dismiss that already opened list
      if (siblingSublist) {
        this.clearList(siblingSublist.item.wfId);
      }

      // If openSub has possible trigger action then draw that list
      if (e.detail.listId) {
        this.drawList(e.detail.listId, e.detail.anchor, e.target as any);
      }
    });

    dismissCurrentSub.on((e: CustomEvent) => {

      if (this.renderTree.length > 1) {
        this.clearList(this.renderTree[this.renderTree.length - 1].item.wfId);
      }
    });

    this.renderTree.forEach((x) => {
      if (x.requester && x.item.anchor) {
        (x.item.anchor as any).highlight = true;
      }
    });

    this.focusRecentSubmenuItem();
  }

  private async clearList(listId: string) {

    // During dismiss, we might have to dismiss certain items.
    const listIndex = this.renderTree.findIndex((x) => x.item.wfId === listId);

    if (listIndex === -1) {
      throw new Error(`WF: List with id: ${listId} could not be dismissed`);
    }

    const removedListItems = this.renderTree.slice(listIndex);

    this.renderTree = this.renderTree.slice(0, listIndex);

    const renderList = this.renderTree.map((x) => x.item.listEl);
    this.surfaceCtrl.children(renderList);

    removedListItems.forEach(({ item, events }) => {
      item.dismiss();

      // Cleanup events
      events.forEach((sub) => sub.off());
    });

    this.focusRecentSubmenuItem();

    const recent = this.getRecentSubmenu();

    if (recent) {
      const items = recent.item.listEl.querySelectorAll('wf-menu-item');
      items.forEach((x: any) => x.highlight = false);
    }

  }

  private findSublistForRequester(requester?: MenuListRenderer<T>) {
    return this.renderTree.find((x) => x.requester && x.requester === requester);
  }

  private focusRecentSubmenuItem() {
    const recentMenuToFocus = this.getRecentSubmenu();

    if (recentMenuToFocus) {
      const items = recentMenuToFocus.item.listEl.querySelectorAll('wf-menu-item');
      const index = Array.from(items).findIndex((x: any) => x.highlight === true);

      // Attempt to resume focus back to the same element
      recentMenuToFocus.item.listEl.focusMenuItem(index > -1 ? index : 0);
    }
  }

  private getRecentSubmenu() {
    return this.renderTree[this.renderTree.length - 1];
  }


  private async openMenu() {

    this.state = 'opening';
    this.surfaceCtrl.show();

    this.renderTree = [];

    // Attempt to open primary list
    await this.drawList(this.primary, this);

    // Listen for scroll events
    this.backdropSub.on(() => this.dismissMenu());
    this.keydownSub.on((e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Tab') {
        this.dismissMenu();
      }
    });

    this.state = 'opened';
  }

  private dismissMenu() {

    if (this.renderTree.length === 0) {
      return;
    }

    this.state = 'closing';

    this.backdropSub.off();
    this.keydownSub.off();

    this.clearList(this.primary);
    this.surfaceCtrl.dismiss();

    this.state = 'closed';
  }

  private aquireListForId(listId: string): MenuList<T> | null {
    return this.querySelector(`wf-menu-list[wfId='${listId}']`);
  }

  private isListAlreadyOpen(listId: string) {
    return this.renderTree.some((x) => x.item.wfId === listId);
  }

  render() {
    return html`<slot></slot>`;
  }

}
