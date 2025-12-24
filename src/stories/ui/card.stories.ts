import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../components/ui/card";
import "../../components/ui/button";
import "../../components/ui/input";

const meta: Meta = {
  title: "solias-doc/Card",
  component: "solias-card",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A card component that displays content with header, body, and footer sections. Useful for grouping related information.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default card with all sections: header (title, description), content, and footer.
 */
export const Default: Story = {
  render: () => html`
    <solias-card style="max-width: 380px;">
      <solias-card-header>
        <solias-card-title>Card Title</solias-card-title>
        <solias-card-description>Card Description</solias-card-description>
      </solias-card-header>
      <solias-card-content>
        <p>Card Content goes here. This is the main body of the card.</p>
      </solias-card-content>
      <solias-card-footer>
        <p class="text-sm text-muted-foreground">Card Footer</p>
      </solias-card-footer>
    </solias-card>
  `,
};

/**
 * Card with an action button in the header.
 */
export const WithAction: Story = {
  render: () => html`
    <solias-card style="max-width: 380px;">
      <solias-card-header>
        <solias-card-title>Notifications</solias-card-title>
        <solias-card-description
          >You have 3 unread messages</solias-card-description
        >
        <solias-card-action>
          <solias-button variant="outline" size="sm">View All</solias-button>
        </solias-card-action>
      </solias-card-header>
      <solias-card-content>
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-4">
            <div class="h-2 w-2 rounded-full bg-primary"></div>
            <div class="flex-1">
              <p class="text-sm font-medium">New message from John</p>
              <p class="text-xs text-muted-foreground">2 minutes ago</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="h-2 w-2 rounded-full bg-primary"></div>
            <div class="flex-1">
              <p class="text-sm font-medium">Your order has shipped</p>
              <p class="text-xs text-muted-foreground">1 hour ago</p>
            </div>
          </div>
        </div>
      </solias-card-content>
    </solias-card>
  `,
};

/**
 * A login form card example.
 */
export const LoginForm: Story = {
  render: () => html`
    <solias-card style="max-width: 380px;">
      <solias-card-header>
        <solias-card-title>Login to your account</solias-card-title>
        <solias-card-description>
          Enter your email below to login to your account
        </solias-card-description>
      </solias-card-header>
      <solias-card-content>
        <form class="flex flex-col gap-4">
          <div class="grid gap-2">
            <label for="email" class="text-sm font-medium">Email</label>
            <solias-input
              type="email"
              id="email"
              placeholder="m@example.com"
            ></solias-input>
          </div>
          <div class="grid gap-2">
            <label for="password" class="text-sm font-medium">Password</label>
            <solias-input type="password" id="password"></solias-input>
          </div>
        </form>
      </solias-card-content>
      <solias-card-footer>
        <div class="flex flex-col gap-2 w-full">
          <solias-button variant="primary" style="width: 100%;"
            >Login</solias-button
          >
          <solias-button variant="outline" style="width: 100%;"
            >Login with Google</solias-button
          >
        </div>
      </solias-card-footer>
    </solias-card>
  `,
};

/**
 * A simple card with only content.
 */
export const ContentOnly: Story = {
  render: () => html`
    <solias-card style="max-width: 380px;">
      <solias-card-content>
        <p>This card only contains content without a header or footer.</p>
        <p class="mt-2 text-muted-foreground text-sm">
          Useful for simple information blocks.
        </p>
      </solias-card-content>
    </solias-card>
  `,
};

/**
 * A project stats card example.
 */
export const StatsCard: Story = {
  render: () => html`
    <div class="grid gap-4" style="max-width: 800px;">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <solias-card>
          <solias-card-header>
            <solias-card-description>Total Revenue</solias-card-description>
            <solias-card-title class="text-2xl">$45,231.89</solias-card-title>
          </solias-card-header>
          <solias-card-content>
            <p class="text-xs text-muted-foreground">+20.1% from last month</p>
          </solias-card-content>
        </solias-card>
        <solias-card>
          <solias-card-header>
            <solias-card-description>Subscriptions</solias-card-description>
            <solias-card-title class="text-2xl">+2350</solias-card-title>
          </solias-card-header>
          <solias-card-content>
            <p class="text-xs text-muted-foreground">+180.1% from last month</p>
          </solias-card-content>
        </solias-card>
        <solias-card>
          <solias-card-header>
            <solias-card-description>Active Now</solias-card-description>
            <solias-card-title class="text-2xl">+573</solias-card-title>
          </solias-card-header>
          <solias-card-content>
            <p class="text-xs text-muted-foreground">+201 since last hour</p>
          </solias-card-content>
        </solias-card>
      </div>
    </div>
  `,
};

/**
 * A card with a bordered footer.
 */
export const WithBorderedFooter: Story = {
  render: () => html`
    <solias-card style="max-width: 380px;">
      <solias-card-header>
        <solias-card-title>Create project</solias-card-title>
        <solias-card-description>
          Deploy your new project in one-click.
        </solias-card-description>
      </solias-card-header>
      <solias-card-content>
        <form class="flex flex-col gap-4">
          <div class="grid gap-2">
            <label for="name" class="text-sm font-medium">Name</label>
            <solias-input
              id="name"
              placeholder="Name of your project"
            ></solias-input>
          </div>
          <div class="grid gap-2">
            <label for="framework" class="text-sm font-medium">Framework</label>
            <solias-input id="framework" placeholder="Next.js"></solias-input>
          </div>
        </form>
      </solias-card-content>
      <solias-card-footer>
        <div class="flex justify-between w-full border-t pt-4">
          <solias-button variant="outline">Cancel</solias-button>
          <solias-button variant="primary">Deploy</solias-button>
        </div>
      </solias-card-footer>
    </solias-card>
  `,
};
