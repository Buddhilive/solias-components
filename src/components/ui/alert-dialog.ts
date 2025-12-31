import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { tailwindStyles } from "../../utils/styles";

// ============================================================================
// Alert Dialog Title
// ============================================================================
@customElement("solias-alert-dialog-title")
export class SoliasAlertDialogTitle extends LitElement {
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
      <h2 class="text-lg font-semibold">
        <slot></slot>
      </h2>
    `;
  }
}

// ============================================================================
// Alert Dialog Description
// ============================================================================
@customElement("solias-alert-dialog-description")
export class SoliasAlertDialogDescription extends LitElement {
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
      <p class="text-sm text-muted-foreground">
        <slot></slot>
      </p>
    `;
  }
}

// ============================================================================
// Alert Dialog Header
// ============================================================================
@customElement("solias-alert-dialog-header")
export class SoliasAlertDialogHeader extends LitElement {
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
      <div class="flex flex-col space-y-2 text-center sm:text-left">
        <slot></slot>
      </div>
    `;
  }
}

// ============================================================================
// Alert Dialog Footer
// ============================================================================
@customElement("solias-alert-dialog-footer")
export class SoliasAlertDialogFooter extends LitElement {
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
      <div
        class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-2 sm:gap-2"
      >
        <slot></slot>
      </div>
    `;
  }
}

// ============================================================================
// Alert Dialog Cancel Button
// ============================================================================
@customElement("solias-alert-dialog-cancel")
export class SoliasAlertDialogCancel extends LitElement {
  static styles = [
    tailwindStyles,
    css`
      :host {
        display: inline-block;
      }
    `,
  ];

  private _handleClick() {
    this.dispatchEvent(
      new CustomEvent("solias-alert-dialog-close", {
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <button
        type="button"
        @click="${this._handleClick}"
        class="inline-flex items-center justify-center rounded-lg font-medium h-10 px-4 py-2 text-sm border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background cursor-pointer"
      >
        <slot></slot>
      </button>
    `;
  }
}

// ============================================================================
// Alert Dialog Action Button
// ============================================================================
@customElement("solias-alert-dialog-action")
export class SoliasAlertDialogAction extends LitElement {
  @property({ type: String }) variant: "default" | "destructive" = "default";

  static styles = [
    tailwindStyles,
    css`
      :host {
        display: inline-block;
      }
    `,
  ];

  private _handleClick() {
    this.dispatchEvent(
      new CustomEvent("solias-alert-dialog-action", {
        bubbles: true,
        composed: true,
      })
    );
    this.dispatchEvent(
      new CustomEvent("solias-alert-dialog-close", {
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const baseClasses =
      "inline-flex items-center justify-center rounded-lg font-medium h-10 px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background cursor-pointer";

    const variantClasses =
      this.variant === "destructive"
        ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
        : "bg-primary text-primary-foreground hover:bg-primary/90";

    return html`
      <button
        type="button"
        @click="${this._handleClick}"
        class="${baseClasses} ${variantClasses}"
      >
        <slot></slot>
      </button>
    `;
  }
}

// ============================================================================
// Alert Dialog Content
// ============================================================================
@customElement("solias-alert-dialog-content")
export class SoliasAlertDialogContent extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;

  static styles = [
    tailwindStyles,
    css`
      :host {
        display: contents;
      }

      dialog {
        padding: 0;
        border: none;
        max-width: 100vw;
        max-height: 100vh;
        background: transparent;
      }

      dialog::backdrop {
        background-color: rgba(0, 0, 0, 0.8);
        animation: fadeIn 150ms ease-out;
      }

      dialog[open] {
        animation: dialogShow 150ms ease-out;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes dialogShow {
        from {
          opacity: 0;
          transform: scale(0.95);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
    `,
  ];

  private _dialogRef: HTMLDialogElement | null = null;

  firstUpdated() {
    this._dialogRef = this.shadowRoot?.querySelector("dialog") || null;
    this._dialogRef?.addEventListener("cancel", this._handleCancel.bind(this));
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("open")) {
      if (this.open) {
        this._dialogRef?.showModal();
      } else {
        this._dialogRef?.close();
      }
    }
  }

  private _handleCancel(e: Event) {
    e.preventDefault();
    this.dispatchEvent(
      new CustomEvent("solias-alert-dialog-close", {
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <dialog part="dialog">
        <div
          class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg sm:rounded-lg"
        >
          <slot></slot>
        </div>
      </dialog>
    `;
  }
}

// ============================================================================
// Alert Dialog Trigger
// ============================================================================
@customElement("solias-alert-dialog-trigger")
export class SoliasAlertDialogTrigger extends LitElement {
  static styles = [
    tailwindStyles,
    css`
      :host {
        display: inline-block;
      }
    `,
  ];

  private _handleClick() {
    this.dispatchEvent(
      new CustomEvent("solias-alert-dialog-open", {
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <span @click="${this._handleClick}">
        <slot></slot>
      </span>
    `;
  }
}

// ============================================================================
// Alert Dialog (Main Container)
// ============================================================================
@customElement("solias-alert-dialog")
export class SoliasAlertDialog extends LitElement {
  @state() private _open = false;

  static styles = [
    tailwindStyles,
    css`
      :host {
        display: contents;
      }
    `,
  ];

  constructor() {
    super();
    this.addEventListener(
      "solias-alert-dialog-open",
      this._handleOpen as EventListener
    );
    this.addEventListener(
      "solias-alert-dialog-close",
      this._handleClose as EventListener
    );
  }

  private _handleOpen() {
    this._open = true;
    this._updateContent();
  }

  private _handleClose() {
    this._open = false;
    this._updateContent();
  }

  private _updateContent() {
    const content = this.querySelector(
      "solias-alert-dialog-content"
    ) as SoliasAlertDialogContent;
    if (content) {
      content.open = this._open;
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

// ============================================================================
// Type Declarations
// ============================================================================
declare global {
  interface HTMLElementTagNameMap {
    "solias-alert-dialog": SoliasAlertDialog;
    "solias-alert-dialog-trigger": SoliasAlertDialogTrigger;
    "solias-alert-dialog-content": SoliasAlertDialogContent;
    "solias-alert-dialog-header": SoliasAlertDialogHeader;
    "solias-alert-dialog-title": SoliasAlertDialogTitle;
    "solias-alert-dialog-description": SoliasAlertDialogDescription;
    "solias-alert-dialog-footer": SoliasAlertDialogFooter;
    "solias-alert-dialog-cancel": SoliasAlertDialogCancel;
    "solias-alert-dialog-action": SoliasAlertDialogAction;
  }
}
