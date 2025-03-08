import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';
import { SoliasCheckboxComponent } from '../lib/checkbox/checkbox.component';

const meta: Meta<SoliasCheckboxComponent> = {
  title: 'Form Controls/Checkbox',
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
    }
  },
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
    checked: true
  }
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true
  }
};

export const DisabledUnchecked: Story = {
  args: {
    disabled: true,
    checked: false
  }
};
