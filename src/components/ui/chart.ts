import { LitElement, html, css, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { tailwindStyles } from "../../utils/styles";

/**
 * Chart configuration type for defining series labels and colors.
 */
export interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
    icon?: string;
  };
}

/**
 * Chart data point type.
 */
export interface ChartDataPoint {
  [key: string]: string | number;
}

/**
 * SoliasChartContainer - Main wrapper component that provides chart theming.
 * Sets CSS variables for chart colors based on the config.
 */
@customElement("solias-chart-container")
export class SoliasChartContainer extends LitElement {
  static styles = [
    tailwindStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .chart-container {
        position: relative;
        width: 100%;
      }
    `,
  ];

  @property({ type: Object }) config: ChartConfig = {};

  render() {
    // Generate CSS variables from config
    const colorStyles = Object.entries(this.config)
      .map(([key, value]) => `--color-${key}: ${value.color};`)
      .join(" ");

    return html`
      <div class="chart-container" style="${colorStyles}" part="container">
        <slot></slot>
      </div>
    `;
  }
}

/**
 * SoliasBarChart - A bar chart component using native SVG.
 * Supports multiple data series, grid lines, and axis labels.
 */
@customElement("solias-bar-chart")
export class SoliasBarChart extends LitElement {
  static styles = [
    tailwindStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      svg {
        width: 100%;
        height: 100%;
        overflow: visible;
      }

      .bar {
        transition: opacity 0.2s ease;
      }

      .bar:hover {
        opacity: 0.8;
      }

      .grid-line {
        stroke: var(--border, #e4e4e7);
        stroke-dasharray: 4 4;
      }

      .axis-label {
        fill: var(--muted-foreground, #71717a);
        font-size: 12px;
      }

      .axis-line {
        stroke: var(--border, #e4e4e7);
      }
    `,
  ];

  @property({ type: Array }) data: ChartDataPoint[] = [];
  @property({ type: Array }) dataKeys: string[] = [];
  @property({ type: String }) xAxisKey = "";
  @property({ type: Boolean }) showGrid = false;
  @property({ type: Boolean }) showXAxis = false;
  @property({ type: Boolean }) showYAxis = false;
  @property({ type: Number }) barRadius = 4;
  @property({ type: Number }) barGap = 4;
  @property({ type: Number }) height = 200;
  @property({ type: Boolean }) stacked = false;

  @state() private _hoveredBar: { dataIndex: number; keyIndex: number } | null =
    null;
  @state() private _containerWidth = 300;

  private _resizeObserver?: ResizeObserver;

  connectedCallback() {
    super.connectedCallback();
    this._resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        this._containerWidth = entry.contentRect.width;
      }
    });
  }

  firstUpdated() {
    if (this._resizeObserver) {
      this._resizeObserver.observe(this);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
    }
  }

  private _getMaxValue(): number {
    if (this.stacked) {
      return Math.max(
        ...this.data.map((d) =>
          this.dataKeys.reduce((sum, key) => sum + (Number(d[key]) || 0), 0)
        )
      );
    }
    return Math.max(
      ...this.data.flatMap((d) =>
        this.dataKeys.map((key) => Number(d[key]) || 0)
      )
    );
  }

  private _handleBarHover(dataIndex: number, keyIndex: number) {
    this._hoveredBar = { dataIndex, keyIndex };
    const point = this.data[dataIndex];
    const key = this.dataKeys[keyIndex];
    this.dispatchEvent(
      new CustomEvent("bar-hover", {
        detail: {
          data: point,
          dataKey: key,
          value: point[key],
          label: point[this.xAxisKey],
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleBarLeave() {
    this._hoveredBar = null;
    this.dispatchEvent(
      new CustomEvent("bar-leave", { bubbles: true, composed: true })
    );
  }

  render() {
    if (!this.data.length || !this.dataKeys.length) {
      return html`<div class="text-muted-foreground text-sm">No data</div>`;
    }

    const padding = {
      top: 20,
      right: 20,
      bottom: this.showXAxis ? 40 : 20,
      left: this.showYAxis ? 50 : 20,
    };
    const width = this._containerWidth;
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = this.height - padding.top - padding.bottom;

    const maxValue = this._getMaxValue();
    const barGroupWidth = chartWidth / this.data.length;
    const numKeys = this.dataKeys.length;
    const barWidth = this.stacked
      ? barGroupWidth - this.barGap * 2
      : (barGroupWidth - this.barGap * (numKeys + 1)) / numKeys;

    // Generate grid lines
    const gridLines = [];
    if (this.showGrid) {
      const numLines = 5;
      for (let i = 0; i <= numLines; i++) {
        const y = padding.top + (chartHeight / numLines) * i;
        gridLines.push(
          svg`<line class="grid-line" x1="${padding.left}" y1="${y}" x2="${
            width - padding.right
          }" y2="${y}" />`
        );
      }
    }

    // Generate bars
    const bars = this.data.flatMap((point, dataIndex) => {
      const groupX = padding.left + dataIndex * barGroupWidth;

      if (this.stacked) {
        let cumulativeHeight = 0;
        return this.dataKeys.map((key, keyIndex) => {
          const value = Number(point[key]) || 0;
          const barHeight = (value / maxValue) * chartHeight;
          const y = padding.top + chartHeight - cumulativeHeight - barHeight;
          cumulativeHeight += barHeight;

          return svg`
            <rect
              class="bar"
              x="${groupX + this.barGap}"
              y="${y}"
              width="${barWidth}"
              height="${barHeight}"
              rx="${this.barRadius}"
              fill="var(--color-${key}, var(--chart-${keyIndex + 1}))"
              @mouseenter="${() => this._handleBarHover(dataIndex, keyIndex)}"
              @mouseleave="${this._handleBarLeave}"
            />
          `;
        });
      } else {
        return this.dataKeys.map((key, keyIndex) => {
          const value = Number(point[key]) || 0;
          const barHeight = (value / maxValue) * chartHeight;
          const x = groupX + this.barGap + keyIndex * (barWidth + this.barGap);
          const y = padding.top + chartHeight - barHeight;

          return svg`
            <rect
              class="bar"
              x="${x}"
              y="${y}"
              width="${barWidth}"
              height="${barHeight}"
              rx="${this.barRadius}"
              fill="var(--color-${key}, var(--chart-${keyIndex + 1}))"
              @mouseenter="${() => this._handleBarHover(dataIndex, keyIndex)}"
              @mouseleave="${this._handleBarLeave}"
            />
          `;
        });
      }
    });

    // X-axis labels
    const xAxisLabels = this.showXAxis
      ? this.data.map((point, i) => {
          const x = padding.left + i * barGroupWidth + barGroupWidth / 2;
          const y = this.height - 10;
          return svg`
            <text class="axis-label" x="${x}" y="${y}" text-anchor="middle">
              ${String(point[this.xAxisKey] || "")}
            </text>
          `;
        })
      : [];

    // Y-axis labels
    const yAxisLabels = this.showYAxis
      ? Array.from({ length: 6 }, (_, i) => {
          const value = Math.round((maxValue / 5) * (5 - i));
          const y = padding.top + (chartHeight / 5) * i + 4;
          return svg`
            <text class="axis-label" x="${
              padding.left - 10
            }" y="${y}" text-anchor="end">
              ${value}
            </text>
          `;
        })
      : [];

    return html`
      <svg
        viewBox="0 0 ${width} ${this.height}"
        preserveAspectRatio="xMidYMid meet"
        part="chart"
      >
        ${gridLines}
        ${this.showXAxis
          ? svg`<line class="axis-line" x1="${padding.left}" y1="${
              padding.top + chartHeight
            }" x2="${width - padding.right}" y2="${
              padding.top + chartHeight
            }" />`
          : ""}
        ${this.showYAxis
          ? svg`<line class="axis-line" x1="${padding.left}" y1="${
              padding.top
            }" x2="${padding.left}" y2="${padding.top + chartHeight}" />`
          : ""}
        ${bars} ${xAxisLabels} ${yAxisLabels}
      </svg>
    `;
  }
}

/**
 * SoliasLineChart - A line chart component using native SVG.
 * Supports multiple series, smooth curves, and data point markers.
 */
@customElement("solias-line-chart")
export class SoliasLineChart extends LitElement {
  static styles = [
    tailwindStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      svg {
        width: 100%;
        height: 100%;
        overflow: visible;
      }

      .line {
        fill: none;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .data-point {
        transition: r 0.2s ease;
      }

      .data-point:hover {
        r: 6;
      }

      .grid-line {
        stroke: var(--border, #e4e4e7);
        stroke-dasharray: 4 4;
      }

      .axis-label {
        fill: var(--muted-foreground, #71717a);
        font-size: 12px;
      }

      .axis-line {
        stroke: var(--border, #e4e4e7);
      }

      .area {
        opacity: 0.1;
      }
    `,
  ];

  @property({ type: Array }) data: ChartDataPoint[] = [];
  @property({ type: Array }) dataKeys: string[] = [];
  @property({ type: String }) xAxisKey = "";
  @property({ type: Boolean }) showGrid = false;
  @property({ type: Boolean }) showXAxis = false;
  @property({ type: Boolean }) showYAxis = false;
  @property({ type: Boolean }) showDots = true;
  @property({ type: Boolean }) showArea = false;
  @property({ type: Boolean }) smooth = true;
  @property({ type: Number }) height = 200;
  @property({ type: Number }) strokeWidth = 2;

  @state() private _containerWidth = 300;

  private _resizeObserver?: ResizeObserver;

  connectedCallback() {
    super.connectedCallback();
    this._resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        this._containerWidth = entry.contentRect.width;
      }
    });
  }

  firstUpdated() {
    if (this._resizeObserver) {
      this._resizeObserver.observe(this);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
    }
  }

  private _getMaxValue(): number {
    return Math.max(
      ...this.data.flatMap((d) =>
        this.dataKeys.map((key) => Number(d[key]) || 0)
      )
    );
  }

  private _handlePointHover(dataIndex: number, keyIndex: number) {
    const point = this.data[dataIndex];
    const key = this.dataKeys[keyIndex];
    this.dispatchEvent(
      new CustomEvent("point-hover", {
        detail: {
          data: point,
          dataKey: key,
          value: point[key],
          label: point[this.xAxisKey],
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handlePointLeave() {
    this.dispatchEvent(
      new CustomEvent("point-leave", { bubbles: true, composed: true })
    );
  }

  private _getPathData(points: { x: number; y: number }[]): string {
    if (points.length < 2) return "";

    if (!this.smooth) {
      return points
        .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
        .join(" ");
    }

    // Catmull-Rom to Bezier conversion for smooth curves
    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(0, i - 1)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(points.length - 1, i + 2)];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }

    return path;
  }

  render() {
    if (!this.data.length || !this.dataKeys.length) {
      return html`<div class="text-muted-foreground text-sm">No data</div>`;
    }

    const padding = {
      top: 20,
      right: 20,
      bottom: this.showXAxis ? 40 : 20,
      left: this.showYAxis ? 50 : 20,
    };
    const width = this._containerWidth;
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = this.height - padding.top - padding.bottom;

    const maxValue = this._getMaxValue();

    // Generate grid lines
    const gridLines = [];
    if (this.showGrid) {
      const numLines = 5;
      for (let i = 0; i <= numLines; i++) {
        const y = padding.top + (chartHeight / numLines) * i;
        gridLines.push(
          svg`<line class="grid-line" x1="${padding.left}" y1="${y}" x2="${
            width - padding.right
          }" y2="${y}" />`
        );
      }
    }

    // Generate lines and dots for each data key
    const lines = this.dataKeys.map((key, keyIndex) => {
      const points = this.data.map((point, i) => {
        const x = padding.left + (i / (this.data.length - 1)) * chartWidth;
        const value = Number(point[key]) || 0;
        const y = padding.top + chartHeight - (value / maxValue) * chartHeight;
        return { x, y };
      });

      const pathData = this._getPathData(points);
      const color = `var(--color-${key}, var(--chart-${keyIndex + 1}))`;

      // Area under the line
      const areaPath = this.showArea
        ? svg`
            <path
              class="area"
              d="${pathData} L ${points[points.length - 1].x} ${
            padding.top + chartHeight
          } L ${points[0].x} ${padding.top + chartHeight} Z"
              fill="${color}"
            />
          `
        : "";

      // Line path
      const linePath = svg`
        <path
          class="line"
          d="${pathData}"
          stroke="${color}"
          stroke-width="${this.strokeWidth}"
        />
      `;

      // Data points
      const dots = this.showDots
        ? points.map(
            (p, i) => svg`
              <circle
                class="data-point"
                cx="${p.x}"
                cy="${p.y}"
                r="4"
                fill="${color}"
                @mouseenter="${() => this._handlePointHover(i, keyIndex)}"
                @mouseleave="${this._handlePointLeave}"
              />
            `
          )
        : [];

      return svg`
        ${areaPath}
        ${linePath}
        ${dots}
      `;
    });

    // X-axis labels
    const xAxisLabels = this.showXAxis
      ? this.data.map((point, i) => {
          const x = padding.left + (i / (this.data.length - 1)) * chartWidth;
          const y = this.height - 10;
          return svg`
            <text class="axis-label" x="${x}" y="${y}" text-anchor="middle">
              ${String(point[this.xAxisKey] || "")}
            </text>
          `;
        })
      : [];

    // Y-axis labels
    const yAxisLabels = this.showYAxis
      ? Array.from({ length: 6 }, (_, i) => {
          const value = Math.round((maxValue / 5) * (5 - i));
          const y = padding.top + (chartHeight / 5) * i + 4;
          return svg`
            <text class="axis-label" x="${
              padding.left - 10
            }" y="${y}" text-anchor="end">
              ${value}
            </text>
          `;
        })
      : [];

    return html`
      <svg
        viewBox="0 0 ${width} ${this.height}"
        preserveAspectRatio="xMidYMid meet"
        part="chart"
      >
        ${gridLines}
        ${this.showXAxis
          ? svg`<line class="axis-line" x1="${padding.left}" y1="${
              padding.top + chartHeight
            }" x2="${width - padding.right}" y2="${
              padding.top + chartHeight
            }" />`
          : ""}
        ${this.showYAxis
          ? svg`<line class="axis-line" x1="${padding.left}" y1="${
              padding.top
            }" x2="${padding.left}" y2="${padding.top + chartHeight}" />`
          : ""}
        ${lines} ${xAxisLabels} ${yAxisLabels}
      </svg>
    `;
  }
}

/**
 * SoliasChartTooltip - A tooltip component for charts.
 * Displays data values on hover with color indicators.
 */
@customElement("solias-chart-tooltip")
export class SoliasChartTooltip extends LitElement {
  static styles = [
    tailwindStyles,
    css`
      :host {
        display: block;
      }

      .tooltip {
        position: absolute;
        pointer-events: none;
        z-index: 50;
        opacity: 0;
        transition: opacity 0.15s ease;
      }

      .tooltip.visible {
        opacity: 1;
      }

      .tooltip-content {
        background: var(--popover, #fff);
        border: 1px solid var(--border, #e4e4e7);
        border-radius: 0.5rem;
        padding: 0.5rem 0.75rem;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        min-width: 120px;
      }

      .tooltip-label {
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--foreground, #09090b);
        margin-bottom: 0.25rem;
      }

      .tooltip-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.75rem;
      }

      .tooltip-indicator {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .tooltip-indicator.line {
        width: 0.5rem;
        height: 2px;
        border-radius: 1px;
      }

      .tooltip-indicator.dashed {
        width: 0.5rem;
        height: 2px;
        border-radius: 0;
        border-top: 2px dashed;
        background: transparent;
      }

      .tooltip-name {
        color: var(--muted-foreground, #71717a);
      }

      .tooltip-value {
        font-weight: 500;
        color: var(--foreground, #09090b);
        margin-left: auto;
      }
    `,
  ];

  @property({ type: Object }) config: ChartConfig = {};
  @property({ type: String }) indicator: "dot" | "line" | "dashed" = "dot";
  @property({ type: Boolean }) hideLabel = false;
  @property({ type: Boolean }) hideIndicator = false;
  @property({ type: String }) labelKey = "";
  @property({ type: String }) nameKey = "";

  @state() private _visible = false;
  @state() private _x = 0;
  @state() private _y = 0;
  @state() private _data: ChartDataPoint | null = null;
  @state() private _dataKey = "";
  @state() private _value: string | number = "";
  @state() private _label = "";

  show(
    x: number,
    y: number,
    data: ChartDataPoint,
    dataKey: string,
    value: string | number,
    label: string
  ) {
    this._x = x;
    this._y = y;
    this._data = data;
    this._dataKey = dataKey;
    this._value = value;
    this._label = label;
    this._visible = true;
  }

  hide() {
    this._visible = false;
  }

  render() {
    const configEntry = this.config[this._dataKey];
    const displayLabel =
      this.labelKey && this._data ? this._data[this.labelKey] : this._label;
    const displayName = configEntry?.label || this._dataKey;
    const color = configEntry?.color || `var(--chart-1)`;

    return html`
      <div
        class="tooltip ${this._visible ? "visible" : ""}"
        style="left: ${this._x}px; top: ${this
          ._y}px; transform: translate(-50%, -100%) translateY(-8px);"
      >
        <div class="tooltip-content">
          ${!this.hideLabel
            ? html`<div class="tooltip-label">${displayLabel}</div>`
            : ""}
          <div class="tooltip-item">
            ${!this.hideIndicator
              ? html`<span
                  class="tooltip-indicator ${this.indicator}"
                  style="background-color: ${color};"
                ></span>`
              : ""}
            <span class="tooltip-name">${displayName}</span>
            <span class="tooltip-value">${this._value}</span>
          </div>
        </div>
      </div>
    `;
  }
}

/**
 * SoliasChartLegend - A legend component for charts.
 * Displays series labels with color indicators.
 */
@customElement("solias-chart-legend")
export class SoliasChartLegend extends LitElement {
  static styles = [
    tailwindStyles,
    css`
      :host {
        display: block;
      }

      .legend {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
        padding: 0.5rem 0;
      }

      .legend-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
        color: var(--foreground, #09090b);
      }

      .legend-indicator {
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 0.125rem;
        flex-shrink: 0;
      }

      .legend-label {
        color: var(--muted-foreground, #71717a);
      }
    `,
  ];

  @property({ type: Object }) config: ChartConfig = {};
  @property({ type: Array }) dataKeys: string[] = [];
  @property({ type: String }) nameKey = "";
  @property({ type: String }) layout: "horizontal" | "vertical" = "horizontal";

  render() {
    const keys =
      this.dataKeys.length > 0 ? this.dataKeys : Object.keys(this.config);

    return html`
      <div
        class="legend"
        style="${this.layout === "vertical"
          ? "flex-direction: column; align-items: flex-start;"
          : ""}"
        part="legend"
      >
        ${keys.map((key) => {
          const configEntry = this.config[key];
          const label = configEntry?.label || key;
          const color = configEntry?.color || `var(--chart-1)`;

          return html`
            <div class="legend-item">
              <span
                class="legend-indicator"
                style="background-color: ${color};"
              ></span>
              <span class="legend-label">${label}</span>
            </div>
          `;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "solias-chart-container": SoliasChartContainer;
    "solias-bar-chart": SoliasBarChart;
    "solias-line-chart": SoliasLineChart;
    "solias-chart-tooltip": SoliasChartTooltip;
    "solias-chart-legend": SoliasChartLegend;
  }
}
