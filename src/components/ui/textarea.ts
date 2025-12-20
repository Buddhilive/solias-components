import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { tailwindStyles } from "../../utils/styles";

@customElement("solias-textarea")
export class SoliasTextarea extends LitElement {
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
    const target = e.target as HTMLTextAreaElement;
    this.value = target.value;
  }

  private handleChange(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    this.value = target.value;
  }

  render() {
    const classes =
      "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    return html`
      <textarea
        class="${classes}"
        placeholder="${this.placeholder}"
        .value="${this.value}"
        ?disabled="${this.disabled}"
        ?required="${this.required}"
        ?readonly="${this.readonly}"
        @input="${this.handleInput}"
        @change="${this.handleChange}"
        part="textarea"
      ></textarea>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "solias-textarea": SoliasTextarea;
  }
}
