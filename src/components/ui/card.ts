import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { tailwindStyles } from "../../utils/styles";

/**
 * SoliasCard - The main card container component.
 * Displays a card with optional header, content, and footer sections.
 */
@customElement("solias-card")
export class SoliasCard extends LitElement {
  static styles = [
    tailwindStyles,
    css`
      :host {
        display: block;
      }

      .card {
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
        gap: 1.5rem;
      }
    `,
  ];

  render() {
    const classes =
      "card bg-card text-card-foreground flex flex-col rounded-xl border shadow-sm";

    return html`
      <div class="${classes}" data-slot="card" part="card">
        <slot></slot>
      </div>
    `;
  }
}

/**
 * SoliasCardHeader - The header section of a card.
 * Contains title, description, and optional action slots.
 */
@customElement("solias-card-header")
export class SoliasCardHeader extends LitElement {
  static styles = [
    tailwindStyles,
    css`
      :host {
        display: contents;
      }

      .card-header {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
      }
    `,
  ];

  render() {
    const classes =
      "card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 has-[solias-card-action]:grid-cols-[1fr_auto]";

    return html`
      <div class="${classes}" data-slot="card-header" part="header">
        <slot></slot>
      </div>
    `;
  }
}

/**
 * SoliasCardTitle - The title element within a card header.
 */
@customElement("solias-card-title")
export class SoliasCardTitle extends LitElement {
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
        class="leading-none font-semibold"
        data-slot="card-title"
        part="title"
      >
        <slot></slot>
      </div>
    `;
  }
}

/**
 * SoliasCardDescription - The description element within a card header.
 */
@customElement("solias-card-description")
export class SoliasCardDescription extends LitElement {
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
        class="text-muted-foreground text-sm"
        data-slot="card-description"
        part="description"
      >
        <slot></slot>
      </div>
    `;
  }
}

/**
 * SoliasCardAction - An action element positioned in the top-right of the header.
 */
@customElement("solias-card-action")
export class SoliasCardAction extends LitElement {
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
        class="col-start-2 row-span-2 row-start-1 self-start justify-self-end"
        data-slot="card-action"
        part="action"
      >
        <slot></slot>
      </div>
    `;
  }
}

/**
 * SoliasCardContent - The main content area of a card.
 */
@customElement("solias-card-content")
export class SoliasCardContent extends LitElement {
  static styles = [
    tailwindStyles,
    css`
      :host {
        display: contents;
      }

      .card-content {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
      }
    `,
  ];

  render() {
    return html`
      <div class="card-content" data-slot="card-content" part="content">
        <slot></slot>
      </div>
    `;
  }
}

/**
 * SoliasCardFooter - The footer section of a card.
 */
@customElement("solias-card-footer")
export class SoliasCardFooter extends LitElement {
  static styles = [
    tailwindStyles,
    css`
      :host {
        display: contents;
      }

      .card-footer {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
      }
    `,
  ];

  render() {
    return html`
      <div
        class="card-footer flex items-center"
        data-slot="card-footer"
        part="footer"
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "solias-card": SoliasCard;
    "solias-card-header": SoliasCardHeader;
    "solias-card-title": SoliasCardTitle;
    "solias-card-description": SoliasCardDescription;
    "solias-card-action": SoliasCardAction;
    "solias-card-content": SoliasCardContent;
    "solias-card-footer": SoliasCardFooter;
  }
}
