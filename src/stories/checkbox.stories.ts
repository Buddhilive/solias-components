import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

export interface SoliasCheckboxProps {
  disabled?: boolean;
  checked?: boolean;
}

export const SoliasNativeCheckbox = ({ disabled, checked }: SoliasCheckboxProps) => {
return html`
<input type="checkbox" ?disabled=${disabled} ?checked=${checked} />
  `;
};

const meta = {
  title: 'Form/Checkbox',
  tags: ['autodocs'],
  render: (args) => SoliasNativeCheckbox(args),
  argTypes: {
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' }}
    },
    checked: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' }}
    }
  },
} satisfies Meta<SoliasCheckboxProps>;

export default meta;
type Story = StoryObj<SoliasCheckboxProps>;

export const checkboxDisabled: Story = {
  args: {
    disabled: true
  }
};

export const checkboxChecked: Story = {
  args: {
    checked: true
  }
};

export const checkboxCheckedDisabled: Story = {
  args: {
    disabled: true,
    checked: true
  }
};
