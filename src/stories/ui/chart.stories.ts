import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../components/ui/chart";
import type { ChartConfig, ChartDataPoint } from "../../components/ui/chart";

// Sample data for stories
const chartData: ChartDataPoint[] = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig: ChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
};

const meta: Meta = {
  title: "solias-doc/Chart",
  component: "solias-chart-container",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `A chart component for data visualization. Built using native SVG for maximum compatibility with web components.

## Features
- **Bar Chart**: Grouped and stacked bar charts
- **Line Chart**: Smooth or linear line charts with optional area fill
- **Tooltip**: Interactive tooltips on hover
- **Legend**: Configurable legend display
- **Theming**: CSS variables for light/dark mode support

## Chart Config
The chart config holds configuration for the chart including labels and colors:

\`\`\`typescript
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile", 
    color: "var(--chart-2)",
  },
};
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * A basic bar chart showing desktop and mobile data.
 */
export const BarChart: Story = {
  render: () => html`
    <solias-chart-container .config="${chartConfig}" style="max-width: 600px;">
      <solias-bar-chart
        .data="${chartData}"
        .dataKeys="${["desktop", "mobile"]}"
        xAxisKey="month"
        height="300"
        showGrid
        showXAxis
        showYAxis
      ></solias-bar-chart>
    </solias-chart-container>
  `,
};

/**
 * A bar chart with stacked bars.
 */
export const StackedBarChart: Story = {
  render: () => html`
    <solias-chart-container .config="${chartConfig}" style="max-width: 600px;">
      <solias-bar-chart
        .data="${chartData}"
        .dataKeys="${["desktop", "mobile"]}"
        xAxisKey="month"
        height="300"
        showGrid
        showXAxis
        stacked
      ></solias-bar-chart>
    </solias-chart-container>
  `,
};

/**
 * A basic line chart with smooth curves.
 */
export const LineChart: Story = {
  render: () => html`
    <solias-chart-container .config="${chartConfig}" style="max-width: 600px;">
      <solias-line-chart
        .data="${chartData}"
        .dataKeys="${["desktop", "mobile"]}"
        xAxisKey="month"
        height="300"
        showGrid
        showXAxis
        showYAxis
        showDots
      ></solias-line-chart>
    </solias-chart-container>
  `,
};

/**
 * A line chart with area fill.
 */
export const AreaChart: Story = {
  render: () => html`
    <solias-chart-container .config="${chartConfig}" style="max-width: 600px;">
      <solias-line-chart
        .data="${chartData}"
        .dataKeys="${["desktop", "mobile"]}"
        xAxisKey="month"
        height="300"
        showGrid
        showXAxis
        showArea
        showDots
      ></solias-line-chart>
    </solias-chart-container>
  `,
};

/**
 * A line chart with linear (non-smooth) lines.
 */
export const LinearLineChart: Story = {
  render: () => html`
    <solias-chart-container .config="${chartConfig}" style="max-width: 600px;">
      <solias-line-chart
        .data="${chartData}"
        .dataKeys="${["desktop"]}"
        xAxisKey="month"
        height="250"
        showGrid
        showXAxis
        showYAxis
        ?smooth="${false}"
      ></solias-line-chart>
    </solias-chart-container>
  `,
};

/**
 * Chart with a legend component.
 */
export const WithLegend: Story = {
  render: () => html`
    <solias-chart-container .config="${chartConfig}" style="max-width: 600px;">
      <solias-bar-chart
        .data="${chartData}"
        .dataKeys="${["desktop", "mobile"]}"
        xAxisKey="month"
        height="300"
        showGrid
        showXAxis
      ></solias-bar-chart>
      <solias-chart-legend
        .config="${chartConfig}"
        .dataKeys="${["desktop", "mobile"]}"
      ></solias-chart-legend>
    </solias-chart-container>
  `,
};

/**
 * Chart with vertical legend layout.
 */
export const VerticalLegend: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; max-width: 700px;">
      <solias-chart-container .config="${chartConfig}" style="flex: 1;">
        <solias-line-chart
          .data="${chartData}"
          .dataKeys="${["desktop", "mobile"]}"
          xAxisKey="month"
          height="300"
          showGrid
          showXAxis
        ></solias-line-chart>
      </solias-chart-container>
      <solias-chart-legend
        .config="${chartConfig}"
        .dataKeys="${["desktop", "mobile"]}"
        layout="vertical"
      ></solias-chart-legend>
    </div>
  `,
};

/**
 * Simple bar chart without grid or axis labels.
 */
export const MinimalBarChart: Story = {
  render: () => html`
    <solias-chart-container .config="${chartConfig}" style="max-width: 400px;">
      <solias-bar-chart
        .data="${chartData}"
        .dataKeys="${["desktop"]}"
        xAxisKey="month"
        height="150"
        barRadius="8"
      ></solias-bar-chart>
    </solias-chart-container>
  `,
};

/**
 * Using custom colors via chart config.
 */
export const CustomColors: Story = {
  render: () => {
    const customConfig: ChartConfig = {
      desktop: {
        label: "Desktop Users",
        color: "#8b5cf6",
      },
      mobile: {
        label: "Mobile Users",
        color: "#f97316",
      },
    };

    return html`
      <solias-chart-container
        .config="${customConfig}"
        style="max-width: 600px;"
      >
        <solias-bar-chart
          .data="${chartData}"
          .dataKeys="${["desktop", "mobile"]}"
          xAxisKey="month"
          height="300"
          showGrid
          showXAxis
        ></solias-bar-chart>
        <solias-chart-legend
          .config="${customConfig}"
          .dataKeys="${["desktop", "mobile"]}"
        ></solias-chart-legend>
      </solias-chart-container>
    `;
  },
};

/**
 * A complete example with all features enabled.
 */
export const FullExample: Story = {
  render: () => html`
    <solias-card style="max-width: 600px;">
      <solias-card-header>
        <solias-card-title>Website Traffic</solias-card-title>
        <solias-card-description>January - June 2024</solias-card-description>
      </solias-card-header>
      <solias-card-content>
        <solias-chart-container .config="${chartConfig}">
          <solias-bar-chart
            .data="${chartData}"
            .dataKeys="${["desktop", "mobile"]}"
            xAxisKey="month"
            height="300"
            showGrid
            showXAxis
            showYAxis
          ></solias-bar-chart>
          <solias-chart-legend
            .config="${chartConfig}"
            .dataKeys="${["desktop", "mobile"]}"
          ></solias-chart-legend>
        </solias-chart-container>
      </solias-card-content>
      <solias-card-footer>
        <p class="text-sm text-muted-foreground">
          Showing total visitors for the last 6 months
        </p>
      </solias-card-footer>
    </solias-card>
  `,
};

/**
 * Multiple series data example.
 */
export const MultipleSeriesData: Story = {
  render: () => {
    const multiData: ChartDataPoint[] = [
      { month: "Jan", chrome: 275, safari: 200, firefox: 187 },
      { month: "Feb", chrome: 305, safari: 240, firefox: 197 },
      { month: "Mar", chrome: 237, safari: 190, firefox: 167 },
      { month: "Apr", chrome: 273, safari: 210, firefox: 207 },
      { month: "May", chrome: 309, safari: 200, firefox: 227 },
      { month: "Jun", chrome: 314, safari: 180, firefox: 187 },
    ];

    const multiConfig: ChartConfig = {
      chrome: { label: "Chrome", color: "var(--chart-1)" },
      safari: { label: "Safari", color: "var(--chart-2)" },
      firefox: { label: "Firefox", color: "var(--chart-3)" },
    };

    return html`
      <solias-chart-container
        .config="${multiConfig}"
        style="max-width: 600px;"
      >
        <solias-line-chart
          .data="${multiData}"
          .dataKeys="${["chrome", "safari", "firefox"]}"
          xAxisKey="month"
          height="300"
          showGrid
          showXAxis
          showYAxis
          showDots
        ></solias-line-chart>
        <solias-chart-legend
          .config="${multiConfig}"
          .dataKeys="${["chrome", "safari", "firefox"]}"
        ></solias-chart-legend>
      </solias-chart-container>
    `;
  },
};
