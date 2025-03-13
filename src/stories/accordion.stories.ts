import type { Meta } from "@storybook/web-components";
import { html } from "lit";

export const SoliasNativeAccordion = () => {
  return html`
    <details>
      <summary>Details <span class="material-icons">keyboard_arrow_down<span></summary>
      <div class="solias-accordion__content">
        Here goes the accordion content...
      </div>
    </details>
  `;
};

const meta = {
  title: "Components/Accordion",
  tags: ["autodocs"],
  render: () => SoliasNativeAccordion(),
} satisfies Meta;

export default meta;
