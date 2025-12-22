import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { tailwindStyles } from "../../utils/styles";

/**
 * Avatar container component - displays a user image with optional fallback.
 */
@customElement("solias-avatar")
export class SoliasAvatar extends LitElement {
  static styles = [
    tailwindStyles,
    css`
      :host {
        display: inline-block;
      }
    `,
  ];

  render() {
    return html`
      <span
        class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"
        data-slot="avatar"
        part="container"
      >
        <slot></slot>
      </span>
    `;
  }
}

/**
 * Avatar image component - displays the user's profile image.
 */
@customElement("solias-avatar-image")
export class SoliasAvatarImage extends LitElement {
  @property({ type: String }) src = "";
  @property({ type: String }) alt = "";

  @state() private _hasError = false;
  @state() private _isLoaded = false;

  static styles = [
    tailwindStyles,
    css`
      :host {
        display: contents;
      }
      :host([hidden]) {
        display: none;
      }
    `,
  ];

  private _handleLoad() {
    this._isLoaded = true;
    this._hasError = false;
    this.dispatchEvent(
      new CustomEvent("image-load", { bubbles: true, composed: true })
    );
  }

  private _handleError() {
    this._hasError = true;
    this._isLoaded = false;
    this.dispatchEvent(
      new CustomEvent("image-error", { bubbles: true, composed: true })
    );
  }

  render() {
    if (this._hasError || !this.src) {
      return html``;
    }

    return html`
      <img
        class="aspect-square h-full w-full object-cover"
        src="${this.src}"
        alt="${this.alt}"
        part="image"
        @load="${this._handleLoad}"
        @error="${this._handleError}"
        style="${this._isLoaded ? "" : "display: none;"}"
      />
    `;
  }
}

/**
 * Avatar fallback component - displays initials or icon when image fails to load.
 */
@customElement("solias-avatar-fallback")
export class SoliasAvatarFallback extends LitElement {
  static styles = [
    tailwindStyles,
    css`
      :host {
        display: contents;
      }
    `,
  ];

  @state() private _showFallback = true;

  connectedCallback() {
    super.connectedCallback();
    // Listen for image load/error events from sibling
    this._setupImageListeners();
  }

  private _setupImageListeners() {
    const parent = this.parentElement;
    if (parent) {
      parent.addEventListener("image-load", () => {
        this._showFallback = false;
      });
      parent.addEventListener("image-error", () => {
        this._showFallback = true;
      });

      // Check if image sibling has already loaded
      const imageSibling = parent.querySelector("solias-avatar-image");
      if (imageSibling) {
        // Give image time to load
        setTimeout(() => {
          const img = imageSibling.shadowRoot?.querySelector("img");
          if (img && img.complete && img.naturalWidth > 0) {
            this._showFallback = false;
          }
        }, 50);
      }
    }
  }

  render() {
    if (!this._showFallback) {
      return html``;
    }

    return html`
      <span
        class="flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground text-sm font-medium"
        part="fallback"
      >
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "solias-avatar": SoliasAvatar;
    "solias-avatar-image": SoliasAvatarImage;
    "solias-avatar-fallback": SoliasAvatarFallback;
  }
}
