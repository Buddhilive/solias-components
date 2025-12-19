import { LitElement, html, css, type PropertyValueMap } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
} from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { tailwindStyles } from "../../utils/styles";

@customElement("solias-radio-group")
export class SoliasRadioGroup extends LitElement {
  @property({ type: String }) value = "";
  @property({ type: String }) name = "";
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean }) disabled = false;

  @queryAssignedElements({ selector: "solias-radio-item" })
  radioItems!: Array<SoliasRadioItem>;

  static styles = [
    tailwindStyles,
    css`
      :host {
        display: grid;
        gap: 0.5rem;
      }
    `,
  ];

  protected firstUpdated() {
    // Small delay to ensure children are ready
    setTimeout(() => this.updateChildrenState(), 0);
    this.addEventListener("click", this.handleClick);
  }

  private handleClick(e: Event) {
    const target = e.target as HTMLElement;
    if (target.tagName.toLowerCase() === "solias-radio-item") {
      const item = target as SoliasRadioItem;
      if (!item.disabled && !this.disabled) {
        this.value = item.value;
        this.dispatchChange();
      }
    }
  }

  updated(
    changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ) {
    if (changedProperties.has("value")) {
      this.updateChildrenState();
    }
    if (changedProperties.has("disabled")) {
      this.updateChildrenState();
    }
  }

  private updateChildrenState() {
    this.radioItems.forEach((item) => {
      item.checked = item.value === this.value;
      if (this.disabled) {
        item.disabled = true;
      }
    });
  }

  private dispatchChange() {
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div role="radiogroup" class="grid gap-2">
        <slot @slotchange="${this.updateChildrenState}"></slot>
        <input
          type="text"
          class="sr-only"
          .value="${this.value}"
          .name="${this.name}"
          ?required="${this.required}"
          tabindex="-1"
          aria-hidden="true"
        />
      </div>
    `;
  }
}

@customElement("solias-radio-item")
export class SoliasRadioItem extends LitElement {
  @property({ type: String }) value = "";
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) id = "";

  static styles = [
    tailwindStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
      }
    `,
  ];

  render() {
    return html`
      <button
        type="button"
        role="radio"
        .id="${this.id}"
        aria-checked="${this.checked}"
        ?disabled="${this.disabled}"
        data-state="${this.checked ? "checked" : "unchecked"}"
        class="${classMap({
          "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50":
            true,
        })}"
      >
        <span
          class="${classMap({
            "flex items-center justify-center": true,
            hidden: !this.checked,
          })}"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-2.5 w-2.5 fill-current text-current"
          >
            <circle cx="12" cy="12" r="12"></circle>
          </svg>
        </span>
      </button>
      <input
        type="radio"
        .value="${this.value}"
        .checked="${this.checked}"
        ?disabled="${this.disabled}"
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
    "solias-radio-group": SoliasRadioGroup;
    "solias-radio-item": SoliasRadioItem;
  }
}
