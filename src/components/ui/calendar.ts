import { LitElement, html, css } from "lit";
import type { PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { tailwindStyles } from "../../utils/styles";

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface CalendarDay {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}

@customElement("solias-calendar")
export class SoliasCalendar extends LitElement {
  @property({ type: Object }) value: Date | undefined = undefined;
  @property({ type: String }) mode: "single" = "single";
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean, attribute: "show-outside-days" })
  showOutsideDays = true;
  @property({ type: Object, attribute: "min-date" }) minDate: Date | undefined =
    undefined;
  @property({ type: Object, attribute: "max-date" }) maxDate: Date | undefined =
    undefined;

  @state() private _viewMonth: number = new Date().getMonth();
  @state() private _viewYear: number = new Date().getFullYear();
  @state() private _focusedDate: Date | null = null;

  static styles = [
    tailwindStyles,
    css`
      :host {
        display: inline-block;
      }

      .calendar-grid {
        display: grid;
        grid-template-columns: repeat(7, minmax(0, 1fr));
        gap: 0.125rem;
      }

      .day-cell {
        aspect-ratio: 1;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    if (this.value) {
      this._viewMonth = this.value.getMonth();
      this._viewYear = this.value.getFullYear();
    }
  }

  protected updated(changedProperties: PropertyValues): void {
    if (changedProperties.has("value") && this.value) {
      this._viewMonth = this.value.getMonth();
      this._viewYear = this.value.getFullYear();
    }
  }

  private getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  private getFirstDayOfMonth(year: number, month: number): number {
    return new Date(year, month, 1).getDay();
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  private isToday(date: Date): boolean {
    return this.isSameDay(date, new Date());
  }

  private isDateDisabled(date: Date): boolean {
    if (this.disabled) return true;
    if (this.minDate && date < this.minDate) return true;
    if (this.maxDate && date > this.maxDate) return true;
    return false;
  }

  private getCalendarDays(): CalendarDay[] {
    const days: CalendarDay[] = [];
    const daysInMonth = this.getDaysInMonth(this._viewYear, this._viewMonth);
    const firstDayOfMonth = this.getFirstDayOfMonth(
      this._viewYear,
      this._viewMonth
    );

    // Previous month days
    const prevMonth = this._viewMonth === 0 ? 11 : this._viewMonth - 1;
    const prevYear =
      this._viewMonth === 0 ? this._viewYear - 1 : this._viewYear;
    const daysInPrevMonth = this.getDaysInMonth(prevYear, prevMonth);

    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const date = new Date(prevYear, prevMonth, day);
      days.push({
        date,
        day,
        isCurrentMonth: false,
        isToday: this.isToday(date),
        isSelected: this.value ? this.isSameDay(date, this.value) : false,
        isDisabled: this.isDateDisabled(date),
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(this._viewYear, this._viewMonth, day);
      days.push({
        date,
        day,
        isCurrentMonth: true,
        isToday: this.isToday(date),
        isSelected: this.value ? this.isSameDay(date, this.value) : false,
        isDisabled: this.isDateDisabled(date),
      });
    }

    // Next month days
    const nextMonth = this._viewMonth === 11 ? 0 : this._viewMonth + 1;
    const nextYear =
      this._viewMonth === 11 ? this._viewYear + 1 : this._viewYear;
    const remainingDays = 42 - days.length; // 6 rows x 7 days

    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(nextYear, nextMonth, day);
      days.push({
        date,
        day,
        isCurrentMonth: false,
        isToday: this.isToday(date),
        isSelected: this.value ? this.isSameDay(date, this.value) : false,
        isDisabled: this.isDateDisabled(date),
      });
    }

    return days;
  }

  private handlePrevMonth() {
    if (this._viewMonth === 0) {
      this._viewMonth = 11;
      this._viewYear--;
    } else {
      this._viewMonth--;
    }
  }

  private handleNextMonth() {
    if (this._viewMonth === 11) {
      this._viewMonth = 0;
      this._viewYear++;
    } else {
      this._viewMonth++;
    }
  }

  private handleDateSelect(day: CalendarDay) {
    if (day.isDisabled) return;
    if (!this.showOutsideDays && !day.isCurrentMonth) return;

    this.value = day.date;
    this.dispatchEvent(
      new CustomEvent("date-select", {
        detail: { date: day.date },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleKeyDown(e: KeyboardEvent, day: CalendarDay) {
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        this.handleDateSelect(day);
        break;
      case "ArrowLeft":
        e.preventDefault();
        this.moveFocus(-1);
        break;
      case "ArrowRight":
        e.preventDefault();
        this.moveFocus(1);
        break;
      case "ArrowUp":
        e.preventDefault();
        this.moveFocus(-7);
        break;
      case "ArrowDown":
        e.preventDefault();
        this.moveFocus(7);
        break;
    }
  }

  private moveFocus(days: number) {
    const currentDate = this._focusedDate || this.value || new Date();
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);

    // Update view if needed
    if (newDate.getMonth() !== this._viewMonth) {
      this._viewMonth = newDate.getMonth();
      this._viewYear = newDate.getFullYear();
    }

    this._focusedDate = newDate;
    this.requestUpdate();

    // Focus the new date after update
    this.updateComplete.then(() => {
      const dateStr = newDate.toISOString().split("T")[0];
      const button = this.shadowRoot?.querySelector(
        `button[data-date="${dateStr}"]`
      ) as HTMLButtonElement;
      button?.focus();
    });
  }

  private getDayClasses(day: CalendarDay): string {
    const baseClasses =
      "inline-flex items-center justify-center text-sm font-normal h-9 w-9 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

    const stateClasses: string[] = [];

    if (day.isSelected) {
      stateClasses.push(
        "bg-primary text-primary-foreground hover:bg-primary/90"
      );
    } else if (day.isToday) {
      stateClasses.push("bg-accent text-accent-foreground");
    } else if (day.isCurrentMonth) {
      stateClasses.push("hover:bg-accent hover:text-accent-foreground");
    }

    if (!day.isCurrentMonth) {
      stateClasses.push("text-muted-foreground opacity-50");
      if (!this.showOutsideDays) {
        stateClasses.push("invisible");
      }
    }

    if (day.isDisabled) {
      stateClasses.push("opacity-50 cursor-not-allowed pointer-events-none");
    }

    return [baseClasses, ...stateClasses].join(" ");
  }

  render() {
    const days = this.getCalendarDays();

    return html`
      <div class="p-3" role="application" aria-label="Calendar">
        <!-- Header with month/year navigation -->
        <div class="flex items-center justify-between mb-4">
          <button
            type="button"
            @click="${this.handlePrevMonth}"
            class="inline-flex items-center justify-center h-7 w-7 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Previous month"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <div
            class="text-sm font-medium"
            aria-live="polite"
            role="heading"
            aria-level="2"
          >
            ${MONTHS[this._viewMonth]} ${this._viewYear}
          </div>

          <button
            type="button"
            @click="${this.handleNextMonth}"
            class="inline-flex items-center justify-center h-7 w-7 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Next month"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        <!-- Days of week header -->
        <div class="calendar-grid mb-1">
          ${DAYS_OF_WEEK.map(
            (day) => html`
              <div
                class="text-center text-xs text-muted-foreground font-medium h-9 flex items-center justify-center"
              >
                ${day}
              </div>
            `
          )}
        </div>

        <!-- Calendar days grid -->
        <div class="calendar-grid" role="grid" aria-label="Calendar days">
          ${days.map(
            (day) => html`
              <button
                type="button"
                class="${this.getDayClasses(day)}"
                data-date="${day.date.toISOString().split("T")[0]}"
                ?disabled="${day.isDisabled ||
                (!this.showOutsideDays && !day.isCurrentMonth)}"
                @click="${() => this.handleDateSelect(day)}"
                @keydown="${(e: KeyboardEvent) => this.handleKeyDown(e, day)}"
                aria-label="${day.date.toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}"
                aria-selected="${day.isSelected}"
                tabindex="${day.isSelected || (day.isToday && !this.value)
                  ? 0
                  : -1}"
              >
                ${day.day}
              </button>
            `
          )}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "solias-calendar": SoliasCalendar;
  }
}
