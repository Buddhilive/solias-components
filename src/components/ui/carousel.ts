import { LitElement, html, css } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { tailwindStyles } from "../../utils/styles";

/**
 * SoliasCarousel - The main carousel container component.
 * Provides a carousel with navigation controls for sliding content.
 *
 * @example
 * ```html
 * <solias-carousel>
 *   <solias-carousel-content>
 *     <solias-carousel-item>Slide 1</solias-carousel-item>
 *     <solias-carousel-item>Slide 2</solias-carousel-item>
 *   </solias-carousel-content>
 *   <solias-carousel-previous></solias-carousel-previous>
 *   <solias-carousel-next></solias-carousel-next>
 * </solias-carousel>
 * ```
 *
 * @fires carousel-select - Dispatched when the selected slide changes
 * @fires carousel-scroll - Dispatched when the carousel scrolls
 */
@customElement("solias-carousel")
export class SoliasCarousel extends LitElement {
  /** Orientation of the carousel: 'horizontal' or 'vertical' */
  @property({ type: String, reflect: true })
  orientation: "horizontal" | "vertical" = "horizontal";

  /** Whether the carousel should loop infinitely */
  @property({ type: Boolean, reflect: true })
  loop = false;

  /** Current slide index (0-based) */
  @state()
  private _currentIndex = 0;

  /** Total number of slides */
  @state()
  private _totalSlides = 0;

  /** Whether at the start of the carousel */
  @state()
  private _canScrollPrev = false;

  /** Whether at the end of the carousel */
  @state()
  private _canScrollNext = true;

  static styles = [
    tailwindStyles,
    css`
      :host {
        display: block;
        position: relative;
      }

      .carousel {
        position: relative;
      }
    `,
  ];

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("keydown", this._handleKeydown);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener("keydown", this._handleKeydown);
  }

  private _handleKeydown = (e: KeyboardEvent): void => {
    const isHorizontal = this.orientation === "horizontal";

    if (
      (isHorizontal && e.key === "ArrowLeft") ||
      (!isHorizontal && e.key === "ArrowUp")
    ) {
      e.preventDefault();
      this.scrollPrev();
    } else if (
      (isHorizontal && e.key === "ArrowRight") ||
      (!isHorizontal && e.key === "ArrowDown")
    ) {
      e.preventDefault();
      this.scrollNext();
    }
  };

  /** Scroll to the previous slide */
  scrollPrev(): void {
    if (!this._canScrollPrev && !this.loop) return;

    const content = this._getContent();
    if (!content) return;

    if (this._currentIndex === 0 && this.loop) {
      content.scrollToIndex(this._totalSlides - 1);
    } else {
      content.scrollToIndex(this._currentIndex - 1);
    }
  }

  /** Scroll to the next slide */
  scrollNext(): void {
    if (!this._canScrollNext && !this.loop) return;

    const content = this._getContent();
    if (!content) return;

    if (this._currentIndex === this._totalSlides - 1 && this.loop) {
      content.scrollToIndex(0);
    } else {
      content.scrollToIndex(this._currentIndex + 1);
    }
  }

  /** Scroll to a specific slide by index */
  scrollToSlide(index: number): void {
    const content = this._getContent();
    if (!content) return;
    content.scrollToIndex(index);
  }

  /** Get the current slide index */
  get currentIndex(): number {
    return this._currentIndex;
  }

  /** Get the total number of slides */
  get totalSlides(): number {
    return this._totalSlides;
  }

  private _getContent(): SoliasCarouselContent | null {
    const slot = this.shadowRoot?.querySelector("slot:not([name])");
    if (!slot) return null;

    const elements = (slot as HTMLSlotElement).assignedElements();
    return elements.find(
      (el) => el.tagName.toLowerCase() === "solias-carousel-content"
    ) as SoliasCarouselContent | null;
  }

  /** Internal: Called by CarouselContent to update state */
  _updateState(currentIndex: number, totalSlides: number): void {
    const prevIndex = this._currentIndex;
    this._currentIndex = currentIndex;
    this._totalSlides = totalSlides;
    this._canScrollPrev = this.loop || currentIndex > 0;
    this._canScrollNext = this.loop || currentIndex < totalSlides - 1;

    // Update navigation buttons
    this._updateNavigationButtons();

    if (prevIndex !== currentIndex) {
      this.dispatchEvent(
        new CustomEvent("carousel-select", {
          detail: { index: currentIndex, total: totalSlides },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private _updateNavigationButtons(): void {
    const slot = this.shadowRoot?.querySelector("slot:not([name])");
    if (!slot) return;

    const elements = (slot as HTMLSlotElement).assignedElements();
    elements.forEach((el) => {
      if (el.tagName.toLowerCase() === "solias-carousel-previous") {
        (el as SoliasCarouselPrevious)._disabled =
          !this._canScrollPrev && !this.loop;
      } else if (el.tagName.toLowerCase() === "solias-carousel-next") {
        (el as SoliasCarouselNext)._disabled =
          !this._canScrollNext && !this.loop;
      }
    });
  }

  render() {
    return html`
      <div
        class="carousel"
        role="region"
        aria-roledescription="carousel"
        tabindex="0"
        part="carousel"
      >
        <slot></slot>
      </div>
    `;
  }
}

/**
 * SoliasCarouselContent - The scrollable content container for carousel items.
 */
@customElement("solias-carousel-content")
export class SoliasCarouselContent extends LitElement {
  @query(".carousel-content")
  private _scrollContainer!: HTMLElement;

  private _resizeObserver: ResizeObserver | null = null;
  private _scrollTimeout: number | null = null;

  static styles = [
    tailwindStyles,
    css`
      :host {
        display: block;
        overflow: hidden;
      }

      .carousel-content {
        display: flex;
        overflow-x: auto;
        overflow-y: hidden;
        scroll-snap-type: x mandatory;
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        -ms-overflow-style: none;
        margin-left: -1rem;
      }

      .carousel-content::-webkit-scrollbar {
        display: none;
      }

      :host-context(solias-carousel[orientation="vertical"]) .carousel-content {
        flex-direction: column;
        overflow-x: hidden;
        overflow-y: auto;
        scroll-snap-type: y mandatory;
        margin-left: 0;
        margin-top: -1rem;
      }
    `,
  ];

  connectedCallback(): void {
    super.connectedCallback();
    this.updateComplete.then(() => {
      this._setupScrollListener();
      this._setupResizeObserver();
      this._updateCarouselState();
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
    }
  }

  private _setupScrollListener(): void {
    if (!this._scrollContainer) return;

    this._scrollContainer.addEventListener("scroll", () => {
      if (this._scrollTimeout) {
        clearTimeout(this._scrollTimeout);
      }

      this._scrollTimeout = window.setTimeout(() => {
        this._updateCarouselState();
        this._dispatchScrollEvent();
      }, 50);
    });
  }

  private _setupResizeObserver(): void {
    if (!this._scrollContainer) return;

    this._resizeObserver = new ResizeObserver(() => {
      this._updateCarouselState();
    });

    this._resizeObserver.observe(this._scrollContainer);
  }

  private _dispatchScrollEvent(): void {
    const carousel = this._getCarousel();
    if (!carousel) return;

    carousel.dispatchEvent(
      new CustomEvent("carousel-scroll", {
        detail: {
          index: carousel.currentIndex,
          total: carousel.totalSlides,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _updateCarouselState(): void {
    const carousel = this._getCarousel();
    if (!carousel || !this._scrollContainer) return;

    const items = this._getItems();
    if (items.length === 0) return;

    const isVertical = carousel.orientation === "vertical";
    const scrollPos = isVertical
      ? this._scrollContainer.scrollTop
      : this._scrollContainer.scrollLeft;

    // Find the closest item to the current scroll position
    let closestIndex = 0;
    let closestDistance = Infinity;

    items.forEach((item, index) => {
      const itemPos = isVertical ? item.offsetTop : item.offsetLeft;
      const distance = Math.abs(scrollPos - itemPos);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    carousel._updateState(closestIndex, items.length);
  }

  private _getCarousel(): SoliasCarousel | null {
    return this.closest("solias-carousel") as SoliasCarousel | null;
  }

  private _getItems(): HTMLElement[] {
    const slot = this.shadowRoot?.querySelector("slot");
    if (!slot) return [];

    return (slot as HTMLSlotElement)
      .assignedElements()
      .filter(
        (el) => el.tagName.toLowerCase() === "solias-carousel-item"
      ) as HTMLElement[];
  }

  /** Scroll to a specific item by index */
  scrollToIndex(index: number): void {
    const items = this._getItems();
    if (index < 0 || index >= items.length || !this._scrollContainer) return;

    const carousel = this._getCarousel();
    const isVertical = carousel?.orientation === "vertical";

    const item = items[index];
    const scrollOptions: ScrollToOptions = {
      behavior: "smooth",
    };

    if (isVertical) {
      scrollOptions.top = item.offsetTop;
    } else {
      scrollOptions.left = item.offsetLeft;
    }

    this._scrollContainer.scrollTo(scrollOptions);
  }

  render() {
    return html`
      <div class="carousel-content" part="content">
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    `;
  }

  private _handleSlotChange(): void {
    this._updateCarouselState();
  }
}

/**
 * SoliasCarouselItem - An individual carousel slide/item.
 */
@customElement("solias-carousel-item")
export class SoliasCarouselItem extends LitElement {
  static styles = [
    tailwindStyles,
    css`
      :host {
        display: block;
        flex: 0 0 100%;
        min-width: 0;
        scroll-snap-align: start;
        padding-left: 1rem;
      }

      :host-context(solias-carousel[orientation="vertical"]) {
        padding-left: 0;
        padding-top: 1rem;
      }

      .carousel-item {
        width: 100%;
        height: 100%;
      }
    `,
  ];

  render() {
    return html`
      <div
        class="carousel-item"
        role="group"
        aria-roledescription="slide"
        part="item"
      >
        <slot></slot>
      </div>
    `;
  }
}

/**
 * SoliasCarouselPrevious - Navigation button to scroll to the previous slide.
 */
@customElement("solias-carousel-previous")
export class SoliasCarouselPrevious extends LitElement {
  /** Internal disabled state managed by the carousel */
  @state()
  _disabled = false;

  static styles = [
    tailwindStyles,
    css`
      :host {
        display: inline-flex;
      }

      .nav-button {
        position: absolute;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: 9999px;
        border: 1px solid hsl(var(--input));
        background-color: hsl(var(--background));
        color: hsl(var(--foreground));
        cursor: pointer;
        transition: background-color 150ms, opacity 150ms;
        left: -3rem;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
      }

      .nav-button:hover:not(:disabled) {
        background-color: hsl(var(--accent));
        color: hsl(var(--accent-foreground));
      }

      .nav-button:disabled {
        opacity: 0.5;
        pointer-events: none;
      }

      .nav-button:focus-visible {
        outline: none;
        ring: 2px;
        ring-color: hsl(var(--ring));
        ring-offset: 2px;
      }

      :host-context(solias-carousel[orientation="vertical"]) .nav-button {
        left: 50%;
        top: -3rem;
        transform: translateX(-50%) rotate(90deg);
      }

      svg {
        width: 1rem;
        height: 1rem;
      }
    `,
  ];

  private _handleClick(): void {
    if (this._disabled) return;

    const carousel = this.closest("solias-carousel") as SoliasCarousel | null;
    if (carousel) {
      carousel.scrollPrev();
    }
  }

  render() {
    return html`
      <button
        class="nav-button"
        type="button"
        ?disabled=${this._disabled}
        @click=${this._handleClick}
        aria-label="Previous slide"
        part="button"
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
          <path d="m15 18-6-6 6-6" />
        </svg>
        <span class="sr-only">Previous slide</span>
      </button>
    `;
  }
}

/**
 * SoliasCarouselNext - Navigation button to scroll to the next slide.
 */
@customElement("solias-carousel-next")
export class SoliasCarouselNext extends LitElement {
  /** Internal disabled state managed by the carousel */
  @state()
  _disabled = false;

  static styles = [
    tailwindStyles,
    css`
      :host {
        display: inline-flex;
      }

      .nav-button {
        position: absolute;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: 9999px;
        border: 1px solid hsl(var(--input));
        background-color: hsl(var(--background));
        color: hsl(var(--foreground));
        cursor: pointer;
        transition: background-color 150ms, opacity 150ms;
        right: -3rem;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
      }

      .nav-button:hover:not(:disabled) {
        background-color: hsl(var(--accent));
        color: hsl(var(--accent-foreground));
      }

      .nav-button:disabled {
        opacity: 0.5;
        pointer-events: none;
      }

      .nav-button:focus-visible {
        outline: none;
        ring: 2px;
        ring-color: hsl(var(--ring));
        ring-offset: 2px;
      }

      :host-context(solias-carousel[orientation="vertical"]) .nav-button {
        right: 50%;
        top: unset;
        bottom: -3rem;
        transform: translateX(50%) rotate(90deg);
      }

      svg {
        width: 1rem;
        height: 1rem;
      }
    `,
  ];

  private _handleClick(): void {
    if (this._disabled) return;

    const carousel = this.closest("solias-carousel") as SoliasCarousel | null;
    if (carousel) {
      carousel.scrollNext();
    }
  }

  render() {
    return html`
      <button
        class="nav-button"
        type="button"
        ?disabled=${this._disabled}
        @click=${this._handleClick}
        aria-label="Next slide"
        part="button"
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
          <path d="m9 18 6-6-6-6" />
        </svg>
        <span class="sr-only">Next slide</span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "solias-carousel": SoliasCarousel;
    "solias-carousel-content": SoliasCarouselContent;
    "solias-carousel-item": SoliasCarouselItem;
    "solias-carousel-previous": SoliasCarouselPrevious;
    "solias-carousel-next": SoliasCarouselNext;
  }
}
