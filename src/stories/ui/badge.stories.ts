import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../components/ui/badge";

const meta: Meta = {
  title: "solias-doc/Badge",
  component: "solias-badge",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "secondary", "destructive", "outline"],
      description: "The visual style variant of the badge",
    },
  },
  render: (args) => html`
    <solias-badge .variant=${args.variant}>
      ${args.slot || "Badge"}
    </solias-badge>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    variant: "default",
    slot: "Default",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    slot: "Secondary",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    slot: "Destructive",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    slot: "Outline",
  },
};

export const AllVariants: Story = {
  render: () => html`
    <div class="flex flex-wrap gap-2">
      <solias-badge variant="default">Default</solias-badge>
      <solias-badge variant="secondary">Secondary</solias-badge>
      <solias-badge variant="destructive">Destructive</solias-badge>
      <solias-badge variant="outline">Outline</solias-badge>
    </div>
  `,
};

export const WithIcon: Story = {
  render: () => html`
    <solias-badge variant="secondary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      Verified
    </solias-badge>
  `,
};

export const CounterBadges: Story = {
  render: () => html`
    <div class="flex flex-wrap gap-2">
      <solias-badge variant="default" class="rounded-full px-2">8</solias-badge>
      <solias-badge variant="destructive" class="rounded-full px-2"
        >99</solias-badge
      >
      <solias-badge variant="outline" class="rounded-full px-2"
        >20+</solias-badge
      >
    </div>
  `,
};
