import type { Meta } from "@storybook/web-components";
import { html } from "lit";

export const SoliasNativeProgress = () => {
  return html`
    <progress value="70" max="100">70 %</progress>
  `;
};

const meta = {
  title: "Components/Progress",
  tags: ["autodocs"],
  render: () => SoliasNativeProgress(),
} satisfies Meta;

export default meta;
