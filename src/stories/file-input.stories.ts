import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

export interface SoliasFileUploadProps {
  disabled?: boolean;
}

export const SoliasNativeFileUpload = ({ disabled }: SoliasFileUploadProps) => {
return html`
<input type="file" ?disabled=${disabled} />
  `;
};

const meta = {
  title: 'Form/File Upload',
  tags: ['autodocs'],
  render: (args) => SoliasNativeFileUpload(args),
  argTypes: {
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' }}
    }
  },
} satisfies Meta<SoliasFileUploadProps>;

export default meta;
type Story = StoryObj<SoliasFileUploadProps>;

export const fileUploadDisabled: Story = {
  args: {
    disabled: true
  }
};
