import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

export interface SoliasButtonProps {
  disabled?: boolean;
  variant?: string;
  size?: string;
  outlined?: boolean;
}

export const SoliasNativeButton = ({
  disabled,
  variant,
  size,
  outlined,
}: SoliasButtonProps) => {
  return html`
    <button
      class=${[
        "solias-btn",
        `solias-btn--${variant || "primary"}${outlined ? "--outlined" : ""}`,
        `solias-btn--${size || "md"}`
      ].join(" ")}
      ?disabled=${disabled}
    >
      Button
    </button>
  `;
};

const meta = {
  title: "Buttons/Button",
  tags: ["autodocs"],
  render: (args) => SoliasNativeButton(args),
  argTypes: {
    disabled: {
      control: "boolean",
      name: "Disabled",
      table: { defaultValue: { summary: "false" } },
    },
    variant: {
      control: "select",
      name: "Button Variant",
      options: ["primary", "secondary", "success", "error"],
      table: { defaultValue: { summary: "primary" } },
    },
    size: {
      control: "select",
      name: "Button Size",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    outlined: {
      control: "boolean",
      name: "Outlined Button",
      table: { defaultValue: { summary: "false" } },
    },
  },
} satisfies Meta<SoliasButtonProps>;

export default meta;
type Story = StoryObj<SoliasButtonProps>;

export const buttonSecondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const buttonSmall: Story = {
  args: {
    size: "sm",
  },
};

export const buttonLarge: Story = {
  args: {
    size: "lg",
  },
};

export const buttonDisabled: Story = {
  args: {
    disabled: true,
  },
};

export const buttonOutlined: Story = {
  args: {
    outlined: true,
  },
};
