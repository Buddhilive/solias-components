import { Meta, StoryObj } from '@storybook/angular';
import { SoliasDatePickerComponent } from '../../lib/date-picker/date-picker.component';

const meta: Meta<SoliasDatePickerComponent> = {
  component: SoliasDatePickerComponent,
  title: 'Form Controls/Date Picker',
  tags: ['autodocs'],
  argTypes: {
    selectedDate: { control: 'date' },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    readonly: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};
export default meta;
type Story = StoryObj<SoliasDatePickerComponent>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Readonly: Story = {
  args: {
    readonly: true,
  },
};
