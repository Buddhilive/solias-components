import { LitElement, html, css, type PropertyValueMap } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from "lit/decorators.js";
import { tailwindStyles } from "../../utils/styles";

@customElement("solias-accordion-trigger")
export class SoliasAccordionTrigger extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;

  static styles = [
    tailwindStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }
      button svg {
        transition: transform 200ms ease;
      }
      button[aria-expanded="true"] svg {
        transform: rotate(180deg);
      }
    `,
  ];

  private _handleClick() {
    this.dispatchEvent(
      new CustomEvent("solias-accordion-trigger-click", {
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <h3 class="flex">
        <button
          type="button"
          @click="${this._handleClick}"
          aria-expanded="${this.open}"
          class="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline cursor-pointer"
        >
          <slot></slot>
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
            class="h-4 w-4 shrink-0"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </h3>
    `;
  }
}

@customElement("solias-accordion-content")
export class SoliasAccordionContent extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;

  static styles = [
    tailwindStyles,
    css`
      :host {
        display: block;
      }
      .content-wrapper {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows 200ms ease-out;
      }
      :host([open]) .content-wrapper {
        grid-template-rows: 1fr;
      }
      .content-inner {
        overflow: hidden;
        min-height: 0;
      }
    `,
  ];

  render() {
    return html`
      <div class="content-wrapper">
        <div class="content-inner">
          <div class="pb-4 pt-0 text-sm">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

@customElement("solias-accordion-item")
export class SoliasAccordionItem extends LitElement {
  @property({ type: String }) value = "";
  @property({ type: Boolean, reflect: true }) open = false;

  static styles = [
    tailwindStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  render() {
    return html`
      <div class="border-b">
        <slot></slot>
      </div>
    `;
  }
}

@customElement("solias-accordion")
export class SoliasAccordion extends LitElement {
  @property({ type: String }) type: "single" | "multiple" = "single";
  @property({ type: Boolean }) collapsible = false;
  @property({ type: Array }) defaultValue: string[] = [];

  @state() private _value: string[] = [];

  static styles = [
    tailwindStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }
    `,
  ];

  constructor() {
    super();
    this.addEventListener(
      "solias-accordion-trigger-click",
      this._handleTriggerClick as EventListener
    );
  }

  protected firstUpdated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (this.defaultValue.length > 0) {
      this._value = [...this.defaultValue];
    }
    this._updateChildren();
  }

  @queryAssignedElements({ selector: "solias-accordion-item" })
  _items!: SoliasAccordionItem[];

  private _handleTriggerClick(e: CustomEvent) {
    const target = e.target as HTMLElement;
    const item = target.closest("solias-accordion-item") as SoliasAccordionItem;
    if (!item) return;

    const value = item.value;

    if (this.type === "multiple") {
      if (this._value.includes(value)) {
        this._value = this._value.filter((v) => v !== value);
      } else {
        this._value = [...this._value, value];
      }
    } else {
      if (this._value.includes(value)) {
        if (this.collapsible) {
          this._value = [];
        }
      } else {
        this._value = [value];
      }
    }
    this._updateChildren();
  }

  private _updateChildren() {
    this._items.forEach((item) => {
      const isOpen = this._value.includes(item.value);
      item.open = isOpen;

      const trigger = item.querySelector(
        "solias-accordion-trigger"
      ) as SoliasAccordionTrigger;
      const content = item.querySelector(
        "solias-accordion-content"
      ) as SoliasAccordionContent;

      if (trigger) trigger.open = isOpen;
      if (content) content.open = isOpen;
    });
  }

  render() {
    return html`
      <div class="w-full">
        <slot @slotchange="${this._updateChildren}"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "solias-accordion": SoliasAccordion;
    "solias-accordion-item": SoliasAccordionItem;
    "solias-accordion-trigger": SoliasAccordionTrigger;
    "solias-accordion-content": SoliasAccordionContent;
  }
}
