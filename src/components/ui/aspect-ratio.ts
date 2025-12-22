import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { tailwindStyles } from "../../utils/styles";

/**
 * AspectRatio Component
 * Displays content within a desired aspect ratio.
 *
 * @element solias-aspect-ratio
 * @slot - The content to display within the aspect ratio container (e.g., images, videos)
 *
 * @example
 * ```html
 * <solias-aspect-ratio ratio="16/9">
 *   <img src="..." alt="..." style="object-fit: cover; width: 100%; height: 100%;" />
 * </solias-aspect-ratio>
 * ```
 */
@customElement("solias-aspect-ratio")
export class SoliasAspectRatio extends LitElement {
  /**
   * The desired aspect ratio as a number (width / height).
   * Common ratios:
   * - 16/9 = 1.7778 (widescreen video)
   * - 4/3 = 1.3333 (traditional TV)
   * - 1/1 = 1 (square)
   * - 21/9 = 2.3333 (ultrawide)
   * @default 1 (square)
   */
  @property({ type: Number }) ratio = 1;

  static styles = [
    tailwindStyles,
    css`
      :host {
        display: block;
      }

      .aspect-ratio-container {
        position: relative;
        width: 100%;
      }

      .aspect-ratio-content {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }
    `,
  ];

  private _validateRatio(ratio: number): number {
    if (typeof ratio !== "number" || isNaN(ratio) || ratio <= 0) {
      console.error(
        `[solias-aspect-ratio] Invalid ratio value: ${ratio}. Ratio must be a positive number. Defaulting to 1.`
      );
      return 1;
    }
    return ratio;
  }

  render() {
    const validRatio = this._validateRatio(this.ratio);
    const paddingBottom = (1 / validRatio) * 100;

    return html`
      <div
        class="aspect-ratio-container"
        style="padding-bottom: ${paddingBottom}%"
        part="container"
      >
        <div class="aspect-ratio-content" part="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "solias-aspect-ratio": SoliasAspectRatio;
  }
}
