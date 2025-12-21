import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../components/ui/textarea";

const meta: Meta = {
  title: "solias-doc/Textarea",
  component: "solias-textarea",
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    value: { control: "text" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
  },
  render: (args) => html`
    <solias-textarea
      .placeholder=${args.placeholder}
      .value=${args.value}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
    ></solias-textarea>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    placeholder: "Type your message here.",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    value: "This is a pre-filled message.",
  },
};
