import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

export interface SoliasTextareaProps {
  disabled?: boolean;
}

export const SoliasNativeTextarea = ({ disabled }: SoliasTextareaProps) => {
return html`
<textarea rows="4" placeholder="Write a comment here..." ?disabled=${disabled}></textarea>
  `;
};

const meta = {
  title: 'Form/Textarea',
  tags: ['autodocs'],
  render: (args) => SoliasNativeTextarea(args),
  argTypes: {
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' }}
    }
  },
} satisfies Meta<SoliasTextareaProps>;

export default meta;
type Story = StoryObj<SoliasTextareaProps>;

export const textareaDisabled: Story = {
  args: {
    disabled: true
  }
};
