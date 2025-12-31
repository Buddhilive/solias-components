import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { tailwindStyles } from "../../utils/styles";

/**
 * Container that groups related buttons together with consistent styling
 * @property {string} orientation - Layout direction: "horizontal" | "vertical"
 */
@customElement("solias-button-group")
export class SoliasButtonGroup extends LitElement {
  @property({ type: String }) orientation: "horizontal" | "vertical" =
    "horizontal";

  static styles = [
    tailwindStyles,
    css`
      :host {
        display: inline-flex;
      }

      .button-group {
        display: inline-flex;
        align-items: stretch;
      }

      .button-group.horizontal {
        flex-direction: row;
      }

      .button-group.vertical {
        flex-direction: column;
        width: fit-content;
      }

      /* Horizontal: Remove border-radius from middle buttons, adjust first/last */
      .button-group.horizontal ::slotted(solias-button) {
        --solias-button-border-radius: 0;
      }

      .button-group.horizontal ::slotted(solias-button:first-of-type) {
        --solias-button-border-radius: 0.5rem 0 0 0.5rem;
      }

      .button-group.horizontal ::slotted(solias-button:last-of-type) {
        --solias-button-border-radius: 0 0.5rem 0.5rem 0;
      }

      .button-group.horizontal ::slotted(solias-button:only-of-type) {
        --solias-button-border-radius: 0.5rem;
      }

      /* Negative margin to overlap borders */
      .button-group.horizontal ::slotted(solias-button:not(:first-of-type)) {
        margin-left: -1px;
      }

      /* Vertical: Adjust border-radius for vertical orientation */
      .button-group.vertical ::slotted(solias-button) {
        --solias-button-border-radius: 0;
        width: 100%;
      }

      .button-group.vertical ::slotted(solias-button:first-of-type) {
        --solias-button-border-radius: 0.5rem 0.5rem 0 0;
      }

      .button-group.vertical ::slotted(solias-button:last-of-type) {
        --solias-button-border-radius: 0 0 0.5rem 0.5rem;
      }

      .button-group.vertical ::slotted(solias-button:only-of-type) {
        --solias-button-border-radius: 0.5rem;
      }

      .button-group.vertical ::slotted(solias-button:not(:first-of-type)) {
        margin-top: -1px;
      }

      /* Handle nested button groups */
      .button-group.horizontal ::slotted(solias-button-group) {
        margin-left: 0.5rem;
      }

      .button-group.horizontal ::slotted(solias-button-group:first-child) {
        margin-left: 0;
      }
    `,
  ];

  render() {
    return html`
      <div
        role="group"
        class="button-group ${this.orientation}"
        part="button-group"
      >
        <slot></slot>
      </div>
    `;
  }
}

/**
 * Visual separator between buttons in a group
 * @property {string} orientation - Separator direction: "horizontal" | "vertical"
 */
@customElement("solias-button-group-separator")
export class SoliasButtonGroupSeparator extends LitElement {
  @property({ type: String }) orientation: "horizontal" | "vertical" =
    "vertical";

  static styles = [
    tailwindStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .separator {
        background-color: var(--border, hsl(var(--border)));
        flex-shrink: 0;
      }

      .separator.vertical {
        width: 1px;
        height: 1rem;
        margin: 0 0.25rem;
      }

      .separator.horizontal {
        width: 1rem;
        height: 1px;
        margin: 0.25rem 0;
      }
    `,
  ];

  render() {
    return html`
      <div
        role="separator"
        aria-orientation="${this.orientation}"
        class="separator ${this.orientation}"
        part="button-group-separator"
      ></div>
    `;
  }
}

/**
 * Text content within a button group, styled to match button height
 */
@customElement("solias-button-group-text")
export class SoliasButtonGroupText extends LitElement {
  static styles = [
    tailwindStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
      }

      .text {
        display: inline-flex;
        align-items: center;
        padding: 0 0.75rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--foreground, hsl(var(--foreground)));
        white-space: nowrap;
      }
    `,
  ];

  render() {
    return html`
      <span class="text" part="button-group-text">
        <slot></slot>
      </span>
    `;
  }
}

// Type declarations for custom elements
declare global {
  interface HTMLElementTagNameMap {
    "solias-button-group": SoliasButtonGroup;
    "solias-button-group-separator": SoliasButtonGroupSeparator;
    "solias-button-group-text": SoliasButtonGroupText;
  }
}
