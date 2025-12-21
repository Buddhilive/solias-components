import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../components/ui/accordion";

const meta: Meta = {
  title: "Components/Accordion",
  component: "solias-accordion",
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["single", "multiple"],
      description:
        "Determines whether one or multiple items can be opened at the same time.",
    },
    collapsible: {
      control: "boolean",
      description:
        "When type is 'single', allows closing content when clicking trigger for an open item.",
    },
    defaultValue: {
      control: "object",
      description: "The value of the item to expand by default.",
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <solias-accordion
      type="${args.type || "single"}"
      ?collapsible="${args.collapsible}"
      .defaultValue="${args.defaultValue || []}"
      class="w-full max-w-[500px]"
    >
      <solias-accordion-item value="item-1">
        <solias-accordion-trigger>Is it accessible?</solias-accordion-trigger>
        <solias-accordion-content>
          Yes. It adheres to the WAI-ARIA design pattern.
        </solias-accordion-content>
      </solias-accordion-item>
      <solias-accordion-item value="item-2">
        <solias-accordion-trigger>Is it styled?</solias-accordion-trigger>
        <solias-accordion-content>
          Yes. It comes with default styles that matches the other components'
          aesthetic.
        </solias-accordion-content>
      </solias-accordion-item>
      <solias-accordion-item value="item-3">
        <solias-accordion-trigger>Is it animated?</solias-accordion-trigger>
        <solias-accordion-content>
          Yes. It's animated by default, but you can disable it if you prefer.
        </solias-accordion-content>
      </solias-accordion-item>
    </solias-accordion>
  `,
  args: {
    type: "single",
    collapsible: true,
  },
};

export const Multiple: Story = {
  ...Default,
  args: {
    type: "multiple",
    collapsible: false,
  },
};
