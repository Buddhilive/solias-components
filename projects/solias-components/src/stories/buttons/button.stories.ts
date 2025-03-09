import type { Meta, StoryObj } from '@storybook/angular';
import { SoliasButtonDirective } from '../../public-api';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<SoliasButtonDirective> = {
  title: 'Buttons/Button',
  component: SoliasButtonDirective,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'success', 'error'],
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      table: { defaultValue: { summary: 'medium' } },
    },
    outlined: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  render: (args) => ({
    props: args,
    template: `<button soliasButton [variant]="variant" [size]="size" [outlined]="outlined" [disabled]="disabled">Button</button>`,
  }),
};

export default meta;
type Story = StoryObj<SoliasButtonDirective>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'large',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'small',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'primary',
    outlined: true,
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
  },
};