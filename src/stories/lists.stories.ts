import type { Meta } from "@storybook/web-components";
import { html } from "lit";

export const SoliasNativeLists = () => {
  return html`
    <h4>Unordered List</h4>
    <ul>
      <li>Kurunegala</li>
      <li>Yapahuwa</li>
      <li>Dambadeniya</li>
    </ul>
    <h4 class="mt-3">Ordered List</h4>
    <ol>
      <li>Tea</li>
      <li>Rubber</li>
      <li>Coconut</li>
    </ol>
  `;
};

const meta = {
  title: "Typography/Lists",
  tags: ["autodocs"],
  render: () => SoliasNativeLists(),
} satisfies Meta;

export default meta;
