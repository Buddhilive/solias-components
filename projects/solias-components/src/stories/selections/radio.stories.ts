import type { Meta, StoryObj } from '@storybook/angular';
import { SoliasRadioDirective } from '../../public-api';

const meta: Meta<SoliasRadioDirective> = {
  title: 'Selections/Radio',
  component: SoliasRadioDirective,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<SoliasRadioDirective>;

export const defaultState: Story = {
  render: (args) => ({
    props: args,
    template: `<input soliasRadio type="radio" />`,
  }),
};

export const Checked: Story = {
  render: (args) => ({
    props: args,
    template: `<input soliasRadio type="radio" checked />`,
  }),
};

export const DisabledChecked: Story = {
  render: (args) => ({
    props: args,
    template: `<input soliasRadio type="radio" [disabled]="true" />`,
  }),
};

export const DisabledUnchecked: Story = {
  render: (args) => ({
    props: args,
    template: `<input soliasRadio type="radio" [disabled]="true" checked />`,
  }),
};
