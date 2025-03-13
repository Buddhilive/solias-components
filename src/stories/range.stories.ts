import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

export interface SoliasRangeProps {
  disabled?: boolean;
}

export const SoliasNativeRange = ({ disabled }: SoliasRangeProps) => {
return html`
<input type="range" ?disabled=${disabled} value="60" />
  `;
};

const meta = {
  title: 'Form/Range',
  tags: ['autodocs'],
  render: (args) => SoliasNativeRange(args),
  argTypes: {
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' }}
    }
  },
} satisfies Meta<SoliasRangeProps>;

export default meta;
type Story = StoryObj<SoliasRangeProps>;

export const rangeDisabled: Story = {
  args: {
    disabled: true
  }
};
