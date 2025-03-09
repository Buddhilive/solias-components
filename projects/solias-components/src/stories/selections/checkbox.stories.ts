import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import { SoliasCheckboxComponent } from '../../public-api';

const meta: Meta<SoliasCheckboxComponent> = {
  title: 'Selections/Checkbox',
  component: SoliasCheckboxComponent,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      label: 'Disabled',
      table: { defaultValue: { summary: 'false' } },
    },
    checked: {
      control: 'boolean',
      label: 'Checked',
      table: { defaultValue: { summary: 'false' } },
    },
    label: {
      control: 'text',
      label: 'Label',
      type: 'string',
    },
    id: {
      control: 'text',
      label: 'Id',
      type: 'string',
    },
    value: {
      control: 'text',
      label: 'Value',
      type: 'string',
    },
    name: {
      control: 'text',
      label: 'Name',
      type: 'string',
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { valueChange: fn() },
};

export default meta;
type Story = StoryObj<SoliasCheckboxComponent>;

export const defaultState: Story = {
  args: {
    disabled: false,
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    disabled: false,
    checked: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

export const DisabledUnchecked: Story = {
  args: {
    disabled: true,
    checked: false,
  },
};
