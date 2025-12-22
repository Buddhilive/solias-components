import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../components/ui/avatar";

const meta: Meta = {
  title: "solias-doc/Avatar",
  component: "solias-avatar",
  tags: ["autodocs"],
  render: (args) => html`
    <solias-avatar>
      <solias-avatar-image
        src="${args.src}"
        alt="${args.alt}"
      ></solias-avatar-image>
      <solias-avatar-fallback>${args.fallback}</solias-avatar-fallback>
    </solias-avatar>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    src: "https://github.com/shadcn.png",
    alt: "@shadcn",
    fallback: "CN",
  },
};

export const WithFallback: Story = {
  args: {
    src: "https://invalid-image-url.example/broken.png",
    alt: "@user",
    fallback: "JD",
  },
  parameters: {
    docs: {
      description: {
        story: "Avatar showing fallback when image fails to load.",
      },
    },
  },
};

export const NoImage: Story = {
  args: {
    src: "",
    alt: "",
    fallback: "AB",
  },
  parameters: {
    docs: {
      description: {
        story: "Avatar with no image source - shows fallback immediately.",
      },
    },
  },
};

export const MultipleAvatars: Story = {
  render: () => html`
    <div class="flex items-center gap-4">
      <solias-avatar>
        <solias-avatar-image
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        ></solias-avatar-image>
        <solias-avatar-fallback>CN</solias-avatar-fallback>
      </solias-avatar>
      <solias-avatar>
        <solias-avatar-image
          src="https://github.com/vercel.png"
          alt="@vercel"
        ></solias-avatar-image>
        <solias-avatar-fallback>VC</solias-avatar-fallback>
      </solias-avatar>
      <solias-avatar>
        <solias-avatar-image
          src="https://invalid.example/broken.png"
          alt="@fallback"
        ></solias-avatar-image>
        <solias-avatar-fallback>FB</solias-avatar-fallback>
      </solias-avatar>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "Multiple avatars displayed together, including one with a broken image to show fallback.",
      },
    },
  },
};

export const StackedAvatars: Story = {
  render: () => html`
    <div class="flex -space-x-4">
      <solias-avatar class="ring-2 ring-background">
        <solias-avatar-image
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        ></solias-avatar-image>
        <solias-avatar-fallback>CN</solias-avatar-fallback>
      </solias-avatar>
      <solias-avatar class="ring-2 ring-background">
        <solias-avatar-image
          src="https://github.com/vercel.png"
          alt="@vercel"
        ></solias-avatar-image>
        <solias-avatar-fallback>VC</solias-avatar-fallback>
      </solias-avatar>
      <solias-avatar class="ring-2 ring-background">
        <solias-avatar-image
          src="https://github.com/leerob.png"
          alt="@leerob"
        ></solias-avatar-image>
        <solias-avatar-fallback>LR</solias-avatar-fallback>
      </solias-avatar>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "Stacked avatars with overlapping effect using negative spacing and ring styling.",
      },
    },
  },
};
