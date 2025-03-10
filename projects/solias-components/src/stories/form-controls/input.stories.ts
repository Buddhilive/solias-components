import { Meta, StoryObj } from '@storybook/angular';
import { SoliasInputDirective } from '../../public-api';

const meta: Meta<SoliasInputDirective> = {
  component: SoliasInputDirective,
  title: 'Form Controls/Inputs',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<SoliasInputDirective>;

export const textInput: Story = {
  render: (args) => ({
    props: args,
    template: `<input soliasInput type="text" placeholder="Enter text" />`,
  }),
};

export const numberInput: Story = {
  render: (args) => ({
    props: args,
    template: `<input soliasInput type="number" placeholder="Enter number" />`,
  }),
};

export const passwordInput: Story = {
  render: (args) => ({
    props: args,
    template: `<input soliasInput type="password" placeholder="Enter password" />`,
  }),
};

export const inputDisabledState: Story = {
  render: (args) => ({
    props: args,
    template: `<input soliasInput type="text" [disabled]="true" [value]="'Disabled value'" />`,
  }),
};

export const inputReadonlyState: Story = {
  render: (args) => ({
    props: args,
    template: `<input soliasInput type="text" [readOnly]="true" [value]="'Readonly value'" />`,
  }),
};

export const inputValidState: Story = {
  render: (args) => ({
    props: args,
    template: `<input soliasInput type="text" [validity]="'valid'" [value]="'Valid value'" />`,
  }),
}

export const inputInvalidState: Story = {
  render: (args) => ({
    props: args,
    template: `<input soliasInput type="text" [validity]="'invalid'" [value]="'Invalid value'" />`,
  }),
}
