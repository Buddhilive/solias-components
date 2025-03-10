import type { Meta, StoryObj } from '@storybook/angular';
import { SoliasCheckboxDirective } from '../../public-api';

const meta: Meta<SoliasCheckboxDirective> = {
  title: 'Selections/Checkbox',
  component: SoliasCheckboxDirective,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<SoliasCheckboxDirective>;

export const defaultState: Story = {
  render: (args) => ({
    props: args,
    template: `<input soliasCheckbox type="checkbox" />`,
  }),
};

export const Checked: Story = {
  render: (args) => ({
    props: args,
    template: `<input soliasCheckbox type="checkbox" checked/>`,
  }),
};

export const DisabledChecked: Story = {
  render: (args) => ({
    props: args,
    template: `<input soliasCheckbox type="checkbox" [disabled]="true" />`,
  }),
};

export const DisabledUnchecked: Story = {
  render: (args) => ({
    props: args,
    template: `<input soliasCheckbox type="checkbox" [disabled]="true" checked />`,
  }),
};
