import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

export interface SoliasInputProps {
  disabled?: boolean;
  type: string;
}
/** This is a native input that uses TailwindCSS styles */
export const SoliasNativeInput = ({ disabled, type='text' }: SoliasInputProps) => {
return html`
    <input type=${type} placeholder="Type here..." ?disabled=${disabled} />
  `;
};


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Form/Inputs',
  tags: ['autodocs'],
  render: (args) => SoliasNativeInput(args),
  argTypes: {
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' }}
    },
    type: {
      control: 'select',
      options: [
        'text',
        'number',
        'email',
        'password',
        'url',
        'tel'
      ],
      table: { defaultValue: { summary: 'text' }}
    }
  },
} satisfies Meta<SoliasInputProps>;

export default meta;
type Story = StoryObj<SoliasInputProps>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const inputDefault: Story = {
  args: {
    type: 'text'
  }
};

export const inputDisabled: Story = {
  args: {
    disabled: true
  }
};
