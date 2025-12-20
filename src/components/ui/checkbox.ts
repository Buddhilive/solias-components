import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { tailwindStyles } from "../../utils/styles";

@customElement("solias-checkbox")
export class SoliasCheckbox extends LitElement {
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) required = false;
  @property({ type: String }) name = "";
  @property({ type: String }) value = "on";
  @property({ type: String }) id = "";

  static styles = [
    tailwindStyles,
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }
    `,
  ];

  private handleClick() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { checked: this.checked },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <button
        type="button"
        role="checkbox"
        .id="${this.id}"
        aria-checked="${this.checked}"
        ?disabled="${this.disabled}"
        data-state="${this.checked ? "checked" : "unchecked"}"
        class="${classMap({
          "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground":
            true,
        })}"
        @click="${this.handleClick}"
      >
        <span
          class="${classMap({
            "flex items-center justify-center text-current": true,
            hidden: !this.checked,
          })}"
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
            class="h-4 w-4"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
      </button>
      <input
        type="checkbox"
        .name="${this.name}"
        .value="${this.value}"
        .checked="${this.checked}"
        ?required="${this.required}"
        tabindex="-1"
        aria-hidden="true"
        class="sr-only"
        @change="${(e: Event) => e.stopPropagation()}"
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "solias-checkbox": SoliasCheckbox;
  }
}
