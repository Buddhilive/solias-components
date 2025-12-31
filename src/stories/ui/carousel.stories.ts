import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../components/ui/carousel";
import "../../components/ui/card";

const meta: Meta = {
  title: "solias-doc/Carousel",
  component: "solias-carousel",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A carousel component with motion and swipe support. Built using native CSS scroll-snap for smooth, performant scrolling.",
      },
    },
  },
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
      description: "The orientation of the carousel",
    },
    loop: {
      control: { type: "boolean" },
      description: "Whether the carousel should loop infinitely",
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default carousel with 5 card items.
 */
export const Default: Story = {
  render: () => html`
    <div style="max-width: 320px; margin: 3rem auto;">
      <solias-carousel>
        <solias-carousel-content>
          ${Array.from({ length: 5 }).map(
            (_, index) => html`
              <solias-carousel-item>
                <div style="padding: 0.25rem;">
                  <solias-card>
                    <solias-card-content>
                      <div
                        class="flex aspect-square items-center justify-center"
                        style="padding: 1.5rem;"
                      >
                        <span class="text-4xl font-semibold">${index + 1}</span>
                      </div>
                    </solias-card-content>
                  </solias-card>
                </div>
              </solias-carousel-item>
            `
          )}
        </solias-carousel-content>
        <solias-carousel-previous></solias-carousel-previous>
        <solias-carousel-next></solias-carousel-next>
      </solias-carousel>
    </div>
  `,
};

/**
 * Carousel items with custom sizes using flex-basis.
 * Shows 2-3 items at once depending on item width.
 */
export const Sizes: Story = {
  render: () => html`
    <div style="max-width: 400px; margin: 3rem auto;">
      <solias-carousel>
        <solias-carousel-content>
          ${Array.from({ length: 5 }).map(
            (_, index) => html`
              <solias-carousel-item style="flex: 0 0 33.333%;">
                <div style="padding: 0.25rem;">
                  <solias-card>
                    <solias-card-content>
                      <div
                        class="flex aspect-square items-center justify-center"
                        style="padding: 1.5rem;"
                      >
                        <span class="text-3xl font-semibold">${index + 1}</span>
                      </div>
                    </solias-card-content>
                  </solias-card>
                </div>
              </solias-carousel-item>
            `
          )}
        </solias-carousel-content>
        <solias-carousel-previous></solias-carousel-previous>
        <solias-carousel-next></solias-carousel-next>
      </solias-carousel>
    </div>
  `,
};

/**
 * Carousel with custom spacing between items.
 */
export const Spacing: Story = {
  render: () => html`
    <div style="max-width: 400px; margin: 3rem auto;">
      <solias-carousel>
        <solias-carousel-content style="margin-left: -1rem;">
          ${Array.from({ length: 5 }).map(
            (_, index) => html`
              <solias-carousel-item
                style="flex: 0 0 33.333%; padding-left: 1rem;"
              >
                <div style="padding: 0.25rem;">
                  <solias-card>
                    <solias-card-content>
                      <div
                        class="flex aspect-square items-center justify-center"
                        style="padding: 1.5rem;"
                      >
                        <span class="text-2xl font-semibold">${index + 1}</span>
                      </div>
                    </solias-card-content>
                  </solias-card>
                </div>
              </solias-carousel-item>
            `
          )}
        </solias-carousel-content>
        <solias-carousel-previous></solias-carousel-previous>
        <solias-carousel-next></solias-carousel-next>
      </solias-carousel>
    </div>
  `,
};

/**
 * Vertically oriented carousel.
 */
export const Vertical: Story = {
  render: () => html`
    <div style="max-width: 320px; margin: 4rem auto;">
      <solias-carousel orientation="vertical">
        <solias-carousel-content style="height: 200px;">
          ${Array.from({ length: 5 }).map(
            (_, index) => html`
              <solias-carousel-item style="flex: 0 0 50%;">
                <div style="padding: 0.25rem;">
                  <solias-card>
                    <solias-card-content>
                      <div
                        class="flex items-center justify-center"
                        style="padding: 1.5rem;"
                      >
                        <span class="text-3xl font-semibold">${index + 1}</span>
                      </div>
                    </solias-card-content>
                  </solias-card>
                </div>
              </solias-carousel-item>
            `
          )}
        </solias-carousel-content>
        <solias-carousel-previous></solias-carousel-previous>
        <solias-carousel-next></solias-carousel-next>
      </solias-carousel>
    </div>
  `,
};

/**
 * Carousel with infinite loop enabled.
 */
export const WithLoop: Story = {
  render: () => html`
    <div style="max-width: 320px; margin: 3rem auto;">
      <solias-carousel loop>
        <solias-carousel-content>
          ${Array.from({ length: 5 }).map(
            (_, index) => html`
              <solias-carousel-item>
                <div style="padding: 0.25rem;">
                  <solias-card>
                    <solias-card-content>
                      <div
                        class="flex aspect-square items-center justify-center"
                        style="padding: 1.5rem;"
                      >
                        <span class="text-4xl font-semibold">${index + 1}</span>
                      </div>
                    </solias-card-content>
                  </solias-card>
                </div>
              </solias-carousel-item>
            `
          )}
        </solias-carousel-content>
        <solias-carousel-previous></solias-carousel-previous>
        <solias-carousel-next></solias-carousel-next>
      </solias-carousel>
      <p class="text-center text-sm text-muted-foreground mt-4">
        Loop is enabled - navigation continues infinitely
      </p>
    </div>
  `,
};

/**
 * Carousel with API showing current slide index and total count.
 */
export const WithAPI: Story = {
  render: () => {
    const handleSelect = (e: CustomEvent) => {
      const indicator = document.getElementById("carousel-indicator");
      if (indicator) {
        indicator.textContent = `Slide ${e.detail.index + 1} of ${
          e.detail.total
        }`;
      }
    };

    return html`
      <div style="max-width: 320px; margin: 3rem auto;">
        <solias-carousel @carousel-select=${handleSelect}>
          <solias-carousel-content>
            ${Array.from({ length: 5 }).map(
              (_, index) => html`
                <solias-carousel-item>
                  <solias-card>
                    <solias-card-content>
                      <div
                        class="flex aspect-square items-center justify-center"
                        style="padding: 1.5rem;"
                      >
                        <span class="text-4xl font-semibold">${index + 1}</span>
                      </div>
                    </solias-card-content>
                  </solias-card>
                </solias-carousel-item>
              `
            )}
          </solias-carousel-content>
          <solias-carousel-previous></solias-carousel-previous>
          <solias-carousel-next></solias-carousel-next>
        </solias-carousel>
        <p
          id="carousel-indicator"
          class="text-center text-sm text-muted-foreground"
          style="padding-top: 0.5rem;"
        >
          Slide 1 of 5
        </p>
      </div>
    `;
  },
};

/**
 * Carousel with image content.
 */
export const WithImages: Story = {
  render: () => html`
    <div style="max-width: 400px; margin: 3rem auto;">
      <solias-carousel>
        <solias-carousel-content>
          ${[
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=400&h=300&fit=crop",
          ].map(
            (src, index) => html`
              <solias-carousel-item>
                <div style="padding: 0.25rem;">
                  <div class="overflow-hidden rounded-lg">
                    <img
                      src="${src}"
                      alt="Mountain landscape ${index + 1}"
                      class="w-full h-auto object-cover"
                      style="aspect-ratio: 4/3;"
                    />
                  </div>
                </div>
              </solias-carousel-item>
            `
          )}
        </solias-carousel-content>
        <solias-carousel-previous></solias-carousel-previous>
        <solias-carousel-next></solias-carousel-next>
      </solias-carousel>
    </div>
  `,
};
