import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../components/ui/alert-dialog";
import "../components/ui/button";

const meta: Meta = {
  title: "Components/Alert Dialog",
  component: "solias-alert-dialog",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A modal dialog that interrupts the user with important content and expects a response.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <solias-alert-dialog>
      <solias-alert-dialog-trigger>
        <solias-button variant="outline">Show Dialog</solias-button>
      </solias-alert-dialog-trigger>
      <solias-alert-dialog-content>
        <solias-alert-dialog-header>
          <solias-alert-dialog-title>
            Are you absolutely sure?
          </solias-alert-dialog-title>
          <solias-alert-dialog-description>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </solias-alert-dialog-description>
        </solias-alert-dialog-header>
        <solias-alert-dialog-footer>
          <solias-alert-dialog-cancel>Cancel</solias-alert-dialog-cancel>
          <solias-alert-dialog-action>Continue</solias-alert-dialog-action>
        </solias-alert-dialog-footer>
      </solias-alert-dialog-content>
    </solias-alert-dialog>
  `,
};

export const DestructiveAction: Story = {
  render: () => html`
    <solias-alert-dialog>
      <solias-alert-dialog-trigger>
        <solias-button variant="outline">Delete Account</solias-button>
      </solias-alert-dialog-trigger>
      <solias-alert-dialog-content>
        <solias-alert-dialog-header>
          <solias-alert-dialog-title>
            Delete your account?
          </solias-alert-dialog-title>
          <solias-alert-dialog-description>
            This action cannot be undone. All your data, including your profile,
            posts, and settings will be permanently deleted.
          </solias-alert-dialog-description>
        </solias-alert-dialog-header>
        <solias-alert-dialog-footer>
          <solias-alert-dialog-cancel>Cancel</solias-alert-dialog-cancel>
          <solias-alert-dialog-action variant="destructive">
            Delete Account
          </solias-alert-dialog-action>
        </solias-alert-dialog-footer>
      </solias-alert-dialog-content>
    </solias-alert-dialog>
  `,
};
