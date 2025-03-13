import type { Meta } from "@storybook/web-components";
import { html } from "lit";

export const SoliasNativeTable = () => {
  return html`
    <table>
      <thead>
        <tr>
          <th scope="col">Province</th>
          <th scope="col">City</th>
          <th scope="col">District</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Western</td>
          <td>Battaramulla</td>
          <td>Colombo</td>
        </tr>
        <tr>
          <td>North Western</td>
          <td>Wariyapola</td>
          <td>Kurunegala</td>
        </tr>
        <tr>
          <td>Northern</td>
          <td>Kankasanturai</td>
          <td>Jaffna</td>
        </tr>
      </tbody>
    </table>
  `;
};

const meta = {
  title: "Components/Table",
  tags: ["autodocs"],
  render: () => SoliasNativeTable(),
} satisfies Meta;

export default meta;
