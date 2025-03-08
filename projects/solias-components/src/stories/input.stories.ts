import { Meta, StoryObj } from '@storybook/angular';
import { SoliasInputDirective } from '../public-api';

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

export const emailInput: Story = {
  render: (args) => ({
    props: args,
    template: `<input soliasInput type="email" placeholder="Enter email" />`,
  }),
};

export const telInput: Story = {
  render: (args) => ({
    props: args,
    template: `<input soliasInput type="tel" placeholder="Enter telephone" />`,
  }),
};

export const passwordInput: Story = {
  render: (args) => ({
    props: args,
    template: `<input soliasInput type="password" placeholder="Enter password" />`,
  }),
};

export const URLInput: Story = {
  render: (args) => ({
    props: args,
    template: `<input soliasInput type="url" placeholder="Enter URL" />`,
  }),
};

export const inputDisabledState: Story = {
  render: (args) => ({
    props: args,
    template: `<input soliasInput type="text" placeholder="Enter text" [disabled]="true" [value]="'Disabled value'" />`,
  }),
};

export const inputReadonlyState: Story = {
  render: (args) => ({
    props: args,
    template: `<input soliasInput type="text" placeholder="Enter text" [readonly]="true" [value]="'Readonly value'" [disabled] />`,
  }),
};

export const inputRequiredState: Story = {
  render: (args) => ({
    props: args,
    template: `<input soliasInput type="text" placeholder="Enter text" [required]="true" />`,
  }),
};
