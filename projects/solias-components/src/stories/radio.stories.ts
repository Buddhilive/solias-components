import type { Meta, StoryObj } from '@storybook/angular';
import { expect, userEvent, within } from '@storybook/test';
import { SoliasRadioComponent } from '../lib/radio/radio.component';

const meta: Meta<SoliasRadioComponent> = {
  title: 'Example/Radio',
  component: SoliasRadioComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      label: 'Disabled',
    },
    checked: {
      control: 'boolean',
      label: 'Checked',
    }
  },
};

export default meta;
type Story = StoryObj<SoliasRadioComponent>;

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
