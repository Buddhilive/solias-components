import type { Meta } from "@storybook/web-components";
import { html } from "lit";

export const SoliasNativeCard = () => {
  return html`
    <div class="solias-card">
      <h5>Sri Lanka</h5>
      <p>
        Sri Lanka, historically known as Ceylon, and officially the Democratic
        Socialist Republic of Sri Lanka, is an island country in South Asia. It
        lies in the Indian Ocean, southwest of the Bay of Bengal, separated from
        the Indian peninsula by the Gulf of Mannar and the Palk Strait.
      </p>
    </div>
  `;
};

const meta = {
  title: "Components/Card",
  tags: ["autodocs"],
  render: () => SoliasNativeCard(),
} satisfies Meta;

export default meta;
