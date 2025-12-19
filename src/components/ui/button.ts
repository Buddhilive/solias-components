import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { tailwindStyles } from "../../utils/styles";

@customElement("solias-button")
export class SoliasButton extends LitElement {
  @property({ type: String }) variant: "primary" | "secondary" | "outline" =
    "primary";
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) size: "sm" | "md" | "lg" = "md";

  static styles = [
    tailwindStyles,
    css`
      :host {
        display: inline-block;
      }
    `,
  ];

  render() {
    const baseClasses =
      "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:pointer-events-none ring-offset-background";

    const variants = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline:
        "border border-input hover:bg-accent hover:text-accent-foreground",
    };

    const sizes = {
      sm: "h-9 px-3 text-xs",
      md: "h-10 py-2 px-4 text-sm",
      lg: "h-11 px-8 text-md",
    };

    const classes = [
      baseClasses,
      variants[this.variant] || variants.primary,
      sizes[this.size] || sizes.md,
      "duration-200",
    ].join(" ");

    return html`
      <button class="${classes}" ?disabled=${this.disabled} part="button">
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "solias-button": SoliasButton;
  }
}
