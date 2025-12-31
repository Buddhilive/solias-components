import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../components/ui/button-group";
import "../../components/ui/button";

const meta: Meta = {
  title: "solias-doc/ButtonGroup",
  component: "solias-button-group",
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <solias-button-group>
      <solias-button variant="outline">Button 1</solias-button>
      <solias-button variant="outline">Button 2</solias-button>
      <solias-button variant="outline">Button 3</solias-button>
    </solias-button-group>
  `,
};

export const Vertical: Story = {
  render: () => html`
    <solias-button-group orientation="vertical">
      <solias-button variant="outline">Button 1</solias-button>
      <solias-button variant="outline">Button 2</solias-button>
      <solias-button variant="outline">Button 3</solias-button>
    </solias-button-group>
  `,
};

export const WithSeparator: Story = {
  render: () => html`
    <solias-button-group>
      <solias-button variant="outline">Cut</solias-button>
      <solias-button-group-separator></solias-button-group-separator>
      <solias-button variant="outline">Copy</solias-button>
      <solias-button-group-separator></solias-button-group-separator>
      <solias-button variant="outline">Paste</solias-button>
    </solias-button-group>
  `,
};

export const WithText: Story = {
  render: () => html`
    <solias-button-group>
      <solias-button-group-text>Label:</solias-button-group-text>
      <solias-button variant="primary">Action</solias-button>
    </solias-button-group>
  `,
};

export const Nested: Story = {
  render: () => html`
    <solias-button-group>
      <solias-button-group>
        <solias-button variant="outline">Back</solias-button>
      </solias-button-group>
      <solias-button-group>
        <solias-button variant="outline">Archive</solias-button>
        <solias-button variant="outline">Report</solias-button>
      </solias-button-group>
      <solias-button-group>
        <solias-button variant="outline">Snooze</solias-button>
        <solias-button variant="outline">More</solias-button>
      </solias-button-group>
    </solias-button-group>
  `,
};

export const MixedVariants: Story = {
  render: () => html`
    <solias-button-group>
      <solias-button variant="primary">Save</solias-button>
      <solias-button variant="secondary">Draft</solias-button>
      <solias-button variant="outline">Cancel</solias-button>
    </solias-button-group>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div class="flex flex-col gap-4">
      <solias-button-group>
        <solias-button variant="outline" size="sm">Small 1</solias-button>
        <solias-button variant="outline" size="sm">Small 2</solias-button>
        <solias-button variant="outline" size="sm">Small 3</solias-button>
      </solias-button-group>

      <solias-button-group>
        <solias-button variant="outline" size="md">Medium 1</solias-button>
        <solias-button variant="outline" size="md">Medium 2</solias-button>
        <solias-button variant="outline" size="md">Medium 3</solias-button>
      </solias-button-group>

      <solias-button-group>
        <solias-button variant="outline" size="lg">Large 1</solias-button>
        <solias-button variant="outline" size="lg">Large 2</solias-button>
        <solias-button variant="outline" size="lg">Large 3</solias-button>
      </solias-button-group>
    </div>
  `,
};
