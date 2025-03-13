import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

export interface SoliasRadioProps {
  disabled?: boolean;
  checked?: boolean;
}

export const SoliasNativeRadio = ({ disabled, checked }: SoliasRadioProps) => {
  return html`
    <input type="radio" ?disabled=${disabled} ?checked=${checked} />
  `;
};

const meta = {
  title: "Form/Radio",
  tags: ["autodocs"],
  render: (args) => SoliasNativeRadio(args),
  argTypes: {
    disabled: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    checked: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
  },
} satisfies Meta<SoliasRadioProps>;

export default meta;
type Story = StoryObj<SoliasRadioProps>;

export const radioDisabled: Story = {
  args: {
    disabled: true,
  },
};

export const radioChecked: Story = {
  args: {
    checked: true,
  },
};

export const radioCheckedDisabled: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};
