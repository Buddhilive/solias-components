import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { tailwindStyles } from "../../utils/styles";

@customElement("solias-select-item")
export class SoliasSelectItem extends LitElement {
  @property({ type: String }) value = "";

  static styles = [
    tailwindStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  private handleClick() {
    this.dispatchEvent(
      new CustomEvent("solias-select", {
        detail: { value: this.value, label: this.textContent },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div
        @click="${this.handleClick}"
        class="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
      >
        <span
          class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center"
        >
          <!-- potential checkmark icon spot -->
        </span>
        <slot></slot>
      </div>
    `;
  }
}

@customElement("solias-select")
export class SoliasSelect extends LitElement {
  @property({ type: String }) placeholder = "Select an option";
  @property({ type: String }) value = "";
  @property({ type: Boolean }) disabled = false;

  @state() private _open = false;
  @state() private _label = "";

  static styles = [
    tailwindStyles,
    css`
      :host {
        display: block;
        position: relative;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("click", this.handleOutsideClick);
    this.addEventListener("solias-select", this.handleSelect as EventListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this.handleOutsideClick);
    this.removeEventListener(
      "solias-select",
      this.handleSelect as EventListener
    );
  }

  private handleOutsideClick = (e: MouseEvent) => {
    if (!this.contains(e.target as Node)) {
      this._open = false;
    }
  };

  private handleTriggerClick() {
    if (this.disabled) return;
    this._open = !this._open;
  }

  private handleSelect(e: CustomEvent) {
    this.value = e.detail.value;
    this._label = e.detail.label || "";
    this._open = false;

    // Dispatch change event
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
  }

  /**
   * Updates the displayed label based on the initial value if one exists.
   * This is a simple implementation and might need to wait for children to render.
   */
  firstUpdated() {
    if (this.value) {
      // This is a bit tricky with slots. We might need to wait or check children content.
      // For now, let's just rely on the user setting an initial label if needed or just showing value if we can't find label.
      // Ideally we find the child with 'value' and get its text content.
      // Since queryAssignedElements might not be ready, we can try a slightly different approach or just leave it blank/placeholder.
      // Let's try to set it if we can find it.
      const slot = this.shadowRoot?.querySelector("slot");
      if (slot) {
        // Initial simple check, improved logic would involve MutationObservers or slotchange events
        const nodes = (slot as HTMLSlotElement).assignedElements();
        const selectedItem = nodes.find((el: any) => el.value === this.value);
        if (selectedItem) {
          this._label = selectedItem.textContent || "";
        }
      }
    }
  }

  private handleSlotChange(e: Event) {
    if (!this.value) return;
    const slot = e.target as HTMLSlotElement;
    const nodes = slot.assignedElements();
    const selectedItem = nodes.find((el: any) => el.value === this.value);
    if (selectedItem) {
      this._label = selectedItem.textContent || "";
      this.requestUpdate();
    }
  }

  render() {
    return html`
      <button
        type="button"
        role="combobox"
        aria-expanded="${this._open}"
        class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        @click="${this.handleTriggerClick}"
      >
        <span class="pointer-events-none"
          >${this._label || this.value || this.placeholder}</span
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4 opacity-50"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      ${this._open
        ? html`
            <div
              class="absolute z-50 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 w-full top-[calc(100%+4px)]"
            >
              <div class="p-1">
                <slot @slotchange="${this.handleSlotChange}"></slot>
              </div>
            </div>
          `
        : null}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "solias-select": SoliasSelect;
    "solias-select-item": SoliasSelectItem;
  }
}
