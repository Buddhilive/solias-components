import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import litLogo from "../assets/lit.svg";
import viteLogo from "/vite.svg";
import { tailwindStyles } from "../utils/styles";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("my-element")
export class MyElement extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @property()
  docsHint = "Click on the Vite and Lit logos to learn more";

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0;

  render() {
    return html`
      <div
        class="max-w-7xl mx-auto p-8 text-center bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg transition-colors"
      >
        <div class="flex justify-center gap-8 mb-8">
          <a href="https://vite.dev" target="_blank">
            <img
              src=${viteLogo}
              class="h-24 p-6 transition-all hover:drop-shadow-[0_0_2em_#646cffaa]"
              alt="Vite logo"
            />
          </a>
          <a href="https://lit.dev" target="_blank">
            <img
              src=${litLogo}
              class="h-24 p-6 transition-all hover:drop-shadow-[0_0_2em_#325cffaa]"
              alt="Lit logo"
            />
          </a>
        </div>
        <slot></slot>
        <div class="p-8">
          <button
            @click=${this._onClick}
            part="button"
            class="rounded-lg border border-transparent px-5 py-2.5 text-base font-medium bg-[#1a1a1a] text-white cursor-pointer transition-colors hover:border-[#646cff] focus:outline-4 focus:outline-webkit-focus-ring-color dark:bg-gray-100 dark:text-gray-900"
          >
            count is ${this.count}
          </button>
        </div>
        <p class="text-gray-500">${this.docsHint}</p>
      </div>
    `;
  }

  private _onClick() {
    this.count++;
  }

  static styles = [
    tailwindStyles,
    css`
      :host {
        display: block;
        padding: 2rem;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "my-element": MyElement;
  }
}
