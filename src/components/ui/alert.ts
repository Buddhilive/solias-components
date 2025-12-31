import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { tailwindStyles } from "../../utils/styles";

@customElement("solias-alert")
export class SoliasAlert extends LitElement {
  @property({ type: String }) variant: "default" | "destructive" = "default";

  static styles = [
    tailwindStyles,
    css`
      :host {
        display: block;
      }
      ::slotted(svg) {
        width: 1rem;
        height: 1rem;
      }
    `,
  ];

  render() {
    const baseClasses =
      "relative w-full rounded-lg border px-4 py-3 text-sm grid grid-cols-[1rem_1fr] gap-x-3 gap-y-0.5 items-start";

    const variants = {
      default: "bg-card text-foreground border-border",
      destructive:
        "text-destructive bg-card border-destructive/50 [&>svg]:text-destructive",
    };

    const classes = [
      baseClasses,
      variants[this.variant] || variants.default,
    ].join(" ");

    return html`
      <div class="${classes}" role="alert">
        <div class="translate-y-0.5">
          <slot name="icon"></slot>
        </div>
        <slot name="title"></slot>
        <slot name="description"></slot>
      </div>
    `;
  }
}

@customElement("solias-alert-title")
export class SoliasAlertTitle extends LitElement {
  static styles = [
    tailwindStyles,
    css`
      :host {
        display: contents;
      }
    `,
  ];

  render() {
    return html`
      <div
        class="col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight"
        data-slot="alert-title"
      >
        <slot></slot>
      </div>
    `;
  }
}

@customElement("solias-alert-description")
export class SoliasAlertDescription extends LitElement {
  static styles = [
    tailwindStyles,
    css`
      :host {
        display: contents;
      }
    `,
  ];

  render() {
    return html`
      <div
        class="col-start-2 text-muted-foreground grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed"
        data-slot="alert-description"
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "solias-alert": SoliasAlert;
    "solias-alert-title": SoliasAlertTitle;
    "solias-alert-description": SoliasAlertDescription;
  }
}
