import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../components/ui/radio-group";

const meta: Meta = {
  title: "solias-doc/RadioGroup",
  component: "solias-radio-group",
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    value: { control: "text" },
  },
  render: (args) => html`
    <solias-radio-group .value=${args.value} ?disabled=${args.disabled}>
      <div class="flex items-center space-x-2">
        <solias-radio-item value="default" id="r1"></solias-radio-item>
        <label for="r1">Default</label>
      </div>
      <div class="flex items-center space-x-2">
        <solias-radio-item value="comfortable" id="r2"></solias-radio-item>
        <label for="r2">Comfortable</label>
      </div>
      <div class="flex items-center space-x-2">
        <solias-radio-item value="compact" id="r3"></solias-radio-item>
        <label for="r3">Compact</label>
      </div>
    </solias-radio-group>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    value: "default",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "comfortable",
  },
};
