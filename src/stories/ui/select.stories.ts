import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../components/ui/select";

const meta: Meta = {
  title: "solias-doc/Select",
  component: "solias-select",
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    value: { control: "text" },
  },
  render: (args) => html`
    <solias-select
      .placeholder=${args.placeholder}
      .value=${args.value}
      ?disabled=${args.disabled}
    >
      <solias-select-item value="apple">Apple</solias-select-item>
      <solias-select-item value="banana">Banana</solias-select-item>
      <solias-select-item value="blueberry">Blueberry</solias-select-item>
      <solias-select-item value="grapes">Grapes</solias-select-item>
      <solias-select-item value="pineapple">Pineapple</solias-select-item>
    </solias-select>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    placeholder: "Select a fruit",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Select a fruit",
  },
};

export const WithValue: Story = {
  args: {
    value: "banana",
    placeholder: "Select a fruit",
  },
};
