import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../components/ui/button";

const meta: Meta = {
  title: "solias-doc/Button",
  component: "solias-button",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "outline"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
  },
  render: (args) => html`
    <solias-button
      .variant=${args.variant}
      .size=${args.size}
      ?disabled=${args.disabled}
    >
      ${args.slot || "Button"}
    </solias-button>
  `,
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    variant: "primary",
    slot: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    slot: "Secondary Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    slot: "Outline Button",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    slot: "Disabled Button",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    slot: "Small Button",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    slot: "Large Button",
  },
};
