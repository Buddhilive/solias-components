import { Meta, StoryObj } from '@storybook/angular';
import { SoliasSelectDirective } from '../../public-api';

const meta: Meta<SoliasSelectDirective> = {
  component: SoliasSelectDirective,
  title: 'Form Controls/Select',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<SoliasSelectDirective>;

export const Select: Story = {
  render: (args) => ({
    props: args,
    template: `<select soliasSelect>
        <option selected>Choose a country</option>
        <option value="US">Sri Lanka</option>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="FR">France</option>
        <option value="DE">Germany</option>
    </select>`,
  }),
};

export const SelectDisabled: Story = {
    render: (args) => ({
        props: args,
        template: `<select soliasSelect [disabled]="true">
            <option selected>Choose a country</option>
            <option value="US">Sri Lanka</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
        </select>`,
      }),
};
