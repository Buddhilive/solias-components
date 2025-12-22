import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { tailwindStyles } from "../../utils/styles";

export type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

@customElement("solias-badge")
export class SoliasBadge extends LitElement {
  @property({ type: String }) variant: BadgeVariant = "default";

  static styles = [
    tailwindStyles,
    css`
      :host {
        display: inline-block;
      }
      ::slotted(svg) {
        width: 0.75rem;
        height: 0.75rem;
        margin-right: 0.25rem;
      }
    `,
  ];

  render() {
    const baseClasses =
      "inline-flex items-center gap-1 rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

    const variants: Record<BadgeVariant, string> = {
      default:
        "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
      secondary:
        "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
      destructive:
        "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
      outline: "border-border text-foreground",
    };

    const classes = [
      baseClasses,
      variants[this.variant] || variants.default,
    ].join(" ");

    return html`
      <span class="${classes}" part="badge">
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "solias-badge": SoliasBadge;
  }
}
