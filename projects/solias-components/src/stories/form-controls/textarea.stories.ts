import { Meta, StoryObj } from '@storybook/angular';
import { SoliasTextareaDirective } from '../../public-api';

const meta: Meta<SoliasTextareaDirective> = {
  component: SoliasTextareaDirective,
  title: 'Form Controls/Textarea',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<SoliasTextareaDirective>;

export const textarea: Story = {
  render: (args) => ({
    props: args,
    template: `<textarea soliasTextarea placeholder="Enter text"></textarea>`,
  }),
};

export const textareaDisabled: Story = {
    render: (args) => ({
      props: args,
      template: `<textarea soliasTextarea [disabled]="true">Disabled text</textarea>`,
    }),
  };