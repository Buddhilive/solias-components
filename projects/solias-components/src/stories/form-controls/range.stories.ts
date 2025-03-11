import type { Meta, StoryObj } from '@storybook/angular';
import { SoliasRangeDirective } from '../../public-api';

const meta: Meta<SoliasRangeDirective> = {
  title: 'Form Controls/Range',
  component: SoliasRangeDirective,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<SoliasRangeDirective>;

export const defaultState: Story = {
  render: (args) => ({
    props: args,
    template: `<input soliasRange type="range" />`,
  }),
};

export const disabledState: Story = {
  render: (args) => ({
    props: args,
    template: `<input soliasRange type="range" [disabled]="true" />`,
  }),
};

