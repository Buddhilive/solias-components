import type { Meta } from "@storybook/web-components";
import { html } from "lit";

export const SoliasNativeFieldset = () => {
  return html`
<fieldset>
    <legend>Personal Details</legend>
    <label>Name</name>
    <input type="text" placeholder="Enter name" />
</fieldset>
  `;
};

const meta = {
  title: "Form/Fieldset",
  tags: ["autodocs"],
  render: () => SoliasNativeFieldset(),
} satisfies Meta;

export default meta;
