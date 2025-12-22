import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../components/ui/aspect-ratio";

const meta: Meta = {
  title: "solias-doc/AspectRatio",
  component: "solias-aspect-ratio",
  tags: ["autodocs"],
  argTypes: {
    ratio: {
      control: { type: "number", min: 0.1, max: 5, step: 0.1 },
      description: "The aspect ratio (width / height)",
      defaultValue: 1,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Displays content within a desired aspect ratio. Useful for images, videos, and other media that need to maintain a consistent ratio regardless of container size.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const imageStyle = `
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
`;

export const Default: Story = {
  args: {
    ratio: 16 / 9,
  },
  render: (args) => html`
    <div style="max-width: 600px;">
      <solias-aspect-ratio .ratio=${args.ratio}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          style=${imageStyle}
        />
      </solias-aspect-ratio>
    </div>
  `,
};

export const Widescreen: Story = {
  args: {
    ratio: 16 / 9,
  },
  render: (args) => html`
    <div style="max-width: 600px;">
      <solias-aspect-ratio .ratio=${args.ratio}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Widescreen (16:9)"
          style=${imageStyle}
        />
      </solias-aspect-ratio>
      <p class="text-sm text-muted-foreground mt-2">16:9 Widescreen Ratio</p>
    </div>
  `,
};

export const Square: Story = {
  args: {
    ratio: 1,
  },
  render: (args) => html`
    <div style="max-width: 400px;">
      <solias-aspect-ratio .ratio=${args.ratio}>
        <img
          src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=600&dpr=2&q=80"
          alt="Square (1:1)"
          style=${imageStyle}
        />
      </solias-aspect-ratio>
      <p class="text-sm text-muted-foreground mt-2">1:1 Square Ratio</p>
    </div>
  `,
};

export const Portrait: Story = {
  args: {
    ratio: 3 / 4,
  },
  render: (args) => html`
    <div style="max-width: 300px;">
      <solias-aspect-ratio .ratio=${args.ratio}>
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&dpr=2&q=80"
          alt="Portrait (3:4)"
          style=${imageStyle}
        />
      </solias-aspect-ratio>
      <p class="text-sm text-muted-foreground mt-2">3:4 Portrait Ratio</p>
    </div>
  `,
};

export const Ultrawide: Story = {
  args: {
    ratio: 21 / 9,
  },
  render: (args) => html`
    <div style="max-width: 800px;">
      <solias-aspect-ratio .ratio=${args.ratio}>
        <img
          src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=1200&dpr=2&q=80"
          alt="Ultrawide (21:9)"
          style=${imageStyle}
        />
      </solias-aspect-ratio>
      <p class="text-sm text-muted-foreground mt-2">21:9 Ultrawide Ratio</p>
    </div>
  `,
};

export const WithVideo: Story = {
  args: {
    ratio: 16 / 9,
  },
  render: (args) => html`
    <div style="max-width: 600px;">
      <solias-aspect-ratio .ratio=${args.ratio}>
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video"
          style="width: 100%; height: 100%; border: none; border-radius: 0.5rem;"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </solias-aspect-ratio>
      <p class="text-sm text-muted-foreground mt-2">Embedded Video (16:9)</p>
    </div>
  `,
};

export const WithPlaceholder: Story = {
  args: {
    ratio: 16 / 9,
  },
  render: (args) => html`
    <div style="max-width: 600px;">
      <solias-aspect-ratio .ratio=${args.ratio}>
        <div
          class="flex items-center justify-center w-full h-full bg-muted rounded-lg"
        >
          <span class="text-muted-foreground">Image Placeholder</span>
        </div>
      </solias-aspect-ratio>
    </div>
  `,
};

export const MultipleRatios: Story = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; max-width: 900px;"
    >
      <div>
        <solias-aspect-ratio .ratio=${1}>
          <div
            class="flex items-center justify-center w-full h-full bg-blue-500/20 rounded-lg border border-blue-500/50"
          >
            <span class="text-sm font-medium">1:1</span>
          </div>
        </solias-aspect-ratio>
      </div>
      <div>
        <solias-aspect-ratio .ratio=${4 / 3}>
          <div
            class="flex items-center justify-center w-full h-full bg-green-500/20 rounded-lg border border-green-500/50"
          >
            <span class="text-sm font-medium">4:3</span>
          </div>
        </solias-aspect-ratio>
      </div>
      <div>
        <solias-aspect-ratio .ratio=${16 / 9}>
          <div
            class="flex items-center justify-center w-full h-full bg-purple-500/20 rounded-lg border border-purple-500/50"
          >
            <span class="text-sm font-medium">16:9</span>
          </div>
        </solias-aspect-ratio>
      </div>
    </div>
  `,
};
