import type { Meta } from "@storybook/web-components";
import { html } from "lit";

export const SoliasNativeDialog = () => {
  return html`
    <dialog open>
      <!-- Dialog header -->
      <div class="solias-dialog__header">
        <h3 class="solias-dialog__title">Terms of Service</h3>
        <button class="solias-dialog__close">
          <span class="material-icons">close</span>
        </button>
      </div>
      <!-- Dialog body -->
      <div class="solias-dialog__body">
        <p>
          With less than a month to go before the European Union enacts new
          consumer privacy laws for its citizens, companies around the world are
          updating their terms of service agreements to comply.
        </p>
      </div>
      <!-- Dialog footer -->
      <div class="solias-dialog__footer">
        <button class="solias-btn solias-btn--primary solias-btn--md">
          Save
        </button>
        <button
          class="solias-btn solias-btn--secondary--outlined solias-btn--md"
        >
          Close
        </button>
      </div>
    </dialog>
  `;
};

const meta = {
  title: "Components/Dialog",
  tags: ["autodocs"],
  render: () => SoliasNativeDialog(),
} satisfies Meta;

export default meta;
