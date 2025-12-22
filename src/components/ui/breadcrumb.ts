import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { tailwindStyles } from "../../utils/styles";

/**
 * Root breadcrumb navigation wrapper
 * Renders a <nav> element with proper ARIA attributes
 */
@customElement("solias-breadcrumb")
export class SoliasBreadcrumb extends LitElement {
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
      <nav aria-label="breadcrumb" part="breadcrumb">
        <slot></slot>
      </nav>
    `;
  }
}

/**
 * Ordered list container for breadcrumb items
 * Provides horizontal flex layout with separators
 */
@customElement("solias-breadcrumb-list")
export class SoliasBreadcrumbList extends LitElement {
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
      <ol
        class="flex flex-wrap items-center gap-1.5 wrap-break-word text-sm text-muted-foreground sm:gap-2.5"
        part="breadcrumb-list"
      >
        <slot></slot>
      </ol>
    `;
  }
}

/**
 * Individual breadcrumb item wrapper
 * Renders as a list item with inline-flex layout
 */
@customElement("solias-breadcrumb-item")
export class SoliasBreadcrumbItem extends LitElement {
  static styles = [
    tailwindStyles,
    css`
      :host {
        display: inline-flex;
      }
    `,
  ];

  render() {
    return html`
      <li class="inline-flex items-center gap-1.5" part="breadcrumb-item">
        <slot></slot>
      </li>
    `;
  }
}

/**
 * Clickable breadcrumb link
 * @property {string} href - The URL the link points to
 */
@customElement("solias-breadcrumb-link")
export class SoliasBreadcrumbLink extends LitElement {
  @property({ type: String }) href = "#";

  static styles = [
    tailwindStyles,
    css`
      :host {
        display: inline-block;
      }
      a {
        text-decoration: none;
      }
    `,
  ];

  render() {
    return html`
      <a
        href="${this.href}"
        class="transition-colors hover:text-foreground"
        part="breadcrumb-link"
      >
        <slot></slot>
      </a>
    `;
  }
}

/**
 * Current page indicator (non-clickable)
 * Displays with aria-current="page" for accessibility
 */
@customElement("solias-breadcrumb-page")
export class SoliasBreadcrumbPage extends LitElement {
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
        role="link"
        aria-disabled="true"
        aria-current="page"
        class="font-normal text-foreground"
        part="breadcrumb-page"
      >
        <slot></slot>
      </span>
    `;
  }
}

/**
 * Separator between breadcrumb items
 * Displays a chevron by default, or custom content via slot
 */
@customElement("solias-breadcrumb-separator")
export class SoliasBreadcrumbSeparator extends LitElement {
  static styles = [
    tailwindStyles,
    css`
      :host {
        display: inline-flex;
      }
      svg {
        width: 1rem;
        height: 1rem;
      }
      ::slotted(svg) {
        width: 1rem;
        height: 1rem;
      }
    `,
  ];

  private _hasSlottedContent = false;

  private _handleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const nodes = slot.assignedNodes({ flatten: true });
    this._hasSlottedContent = nodes.length > 0;
    this.requestUpdate();
  }

  private _renderDefaultSeparator() {
    // ChevronRight icon from Lucide
    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    `;
  }

  render() {
    return html`
      <li
        role="presentation"
        aria-hidden="true"
        class="[&>svg]:size-3.5"
        part="breadcrumb-separator"
      >
        <slot @slotchange="${this._handleSlotChange}"></slot>
        ${!this._hasSlottedContent ? this._renderDefaultSeparator() : ""}
      </li>
    `;
  }
}

/**
 * Ellipsis indicator for collapsed breadcrumb items
 * Shows a "more" icon with screen reader text
 */
@customElement("solias-breadcrumb-ellipsis")
export class SoliasBreadcrumbEllipsis extends LitElement {
  static styles = [
    tailwindStyles,
    css`
      :host {
        display: inline-flex;
      }
      svg {
        width: 1rem;
        height: 1rem;
      }
    `,
  ];

  render() {
    // MoreHorizontal icon from Lucide
    return html`
      <span
        role="presentation"
        aria-hidden="true"
        class="flex size-9 items-center justify-center"
        part="breadcrumb-ellipsis"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
          <circle cx="5" cy="12" r="1" />
        </svg>
        <span class="sr-only">More</span>
      </span>
    `;
  }
}

// Type declarations for custom elements
declare global {
  interface HTMLElementTagNameMap {
    "solias-breadcrumb": SoliasBreadcrumb;
    "solias-breadcrumb-list": SoliasBreadcrumbList;
    "solias-breadcrumb-item": SoliasBreadcrumbItem;
    "solias-breadcrumb-link": SoliasBreadcrumbLink;
    "solias-breadcrumb-page": SoliasBreadcrumbPage;
    "solias-breadcrumb-separator": SoliasBreadcrumbSeparator;
    "solias-breadcrumb-ellipsis": SoliasBreadcrumbEllipsis;
  }
}
