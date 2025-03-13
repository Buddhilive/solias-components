import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("solias-tab")
export class SoliasTab extends LitElement {
  private _tabs: Element[];
  private _panels: Element[];

  constructor() {
    super();
    this._tabs = Array.from(this.querySelectorAll("[slot=tab]"));
    this._panels = Array.from(this.querySelectorAll("[slot=panel]"));
    this.selectTab(0);
  }
  selectTab(tabIndex: number) {
    this._tabs.forEach((tab) => tab.removeAttribute("selected"));
    this._tabs[tabIndex].setAttribute("selected", "");
    this._panels.forEach((panel) => panel.removeAttribute("selected"));
    this._panels[tabIndex].setAttribute("selected", "");
  }

  handleSelect(e: Event) {
    if (e.target) {
      const index = this._tabs.indexOf(e.target as HTMLElement);
      this.selectTab(index);
    }
  }

  render() {
    return html`
      <nav class="solias-tab">
        <slot name="tab" @click=${(e: Event) => this.handleSelect(e)}></slot>
      </nav>
      <slot name="panel"></slot>
    `;
  }

  static styles = css`
    .solias-tab {
      display: flex;
    }
    .solias-tab > ::slotted([slot="tab"]) {
      padding: 0.5rem 1rem !important;
      border-bottom: 1px solid #e5e7eb !important;
      text-align: center;
      cursor: pointer;
    }
    .solias-tab > ::slotted([slot="tab"][selected]) {
      border-color: #6d28d9 !important;
    }
    ::slotted([slot="panel"]) {
      display: none;
    }
    ::slotted([slot="panel"][selected]) {
      display: block;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "solias-tab": SoliasTab;
  }
}
