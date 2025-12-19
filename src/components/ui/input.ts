import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { tailwindStyles } from "../../utils/styles";

@customElement("solias-input")
export class SoliasInput extends LitElement {
  @property({ type: String }) type = "text";
  @property({ type: String }) placeholder = "";
  @property({ type: String }) value = "";
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean }) readonly = false;

  static styles = [
    tailwindStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  private handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;

    // Dispatch input event so parent components can listen to it
    // Lit automatically re-dispatches native events from shadow DOM if composed: true,
    // but 'input' and 'change' compose nicely.
    // However, since we are updating the property 'value', we might want to ensure the event bubbles correctly.
    // Native 'input' event bubbles and composes, so it should be fine.
  }

  private handleChange(e: Event) {
    // Native change event also bubbles and composes.
    const target = e.target as HTMLInputElement;
    this.value = target.value;
  }

  render() {
    const classes =
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    return html`
      <input
        class="${classes}"
        type="${this.type}"
        placeholder="${this.placeholder}"
        .value="${this.value}"
        ?disabled="${this.disabled}"
        ?required="${this.required}"
        ?readonly="${this.readonly}"
        @input="${this.handleInput}"
        @change="${this.handleChange}"
        part="input"
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "solias-input": SoliasInput;
  }
}
