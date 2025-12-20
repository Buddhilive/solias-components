import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../components/ui/button";

const meta: Meta = {
  title: "UI/Button",
  component: "solias-button",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: {
      control: "boolean",
    },
  },
  render: (args) => html`
    <solias-button
      .variant=${args.variant}
      .size=${args.size}
      ?disabled=${args.disabled}
    >
      ${args.label || "Button"}
    </solias-button>
  `,
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    variant: "primary",
    label: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    label: "Secondary Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    label: "Outline Button",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: "Disabled Button",
  },
};
