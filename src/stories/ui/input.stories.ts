import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../components/ui/input";

const meta: Meta = {
  title: "solias-doc/Input",
  component: "solias-input",
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "password", "email", "number"],
    },
    placeholder: { control: "text" },
    value: { control: "text" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
  },
  render: (args) => html`
    <solias-input
      .type=${args.type}
      .placeholder=${args.placeholder}
      .value=${args.value}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
    ></solias-input>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    type: "text",
    placeholder: "Email",
  },
};

export const File: Story = {
  args: {
    type: "file",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled",
  },
};

export const WithValue: Story = {
  args: {
    value: "johndoe@example.com",
  },
};
