import { Meta, StoryObj } from "@storybook/angular";
import { SoliasDatePickerComponent } from "../../lib/date-picker/date-picker.component";

const meta: Meta<SoliasDatePickerComponent> = {
  component: SoliasDatePickerComponent,
  title: 'Form Controls/Date Picker',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<SoliasDatePickerComponent>;

export const Default: Story = {};