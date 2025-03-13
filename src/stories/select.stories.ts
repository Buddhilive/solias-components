import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

export interface SoliasSelectProps {
  disabled?: boolean;
}

export const SoliasNativeSelect = ({ disabled }: SoliasSelectProps) => {
return html`
<select ?disabled=${disabled}>
    <option selected disabled>Choose a city</option>
    <option value="cmb">Colombo</option>
    <option value="kgl">Kurunegala</option>
    <option value="knd">Kandy</option>
    <option value="jfn">Jaffna</option>
    <option value="amp">Ampara</option>
    <option value="gll">Galle</option>
</select>
  `;
};

const meta = {
  title: 'Form/Select',
  tags: ['autodocs'],
  render: (args) => SoliasNativeSelect(args),
  argTypes: {
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' }}
    }
  },
} satisfies Meta<SoliasSelectProps>;

export default meta;
type Story = StoryObj<SoliasSelectProps>;

export const selectDisabled: Story = {
  args: {
    disabled: true
  }
};
