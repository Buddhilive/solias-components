import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'solias-datepicker',
  standalone: true,
  templateUrl: './date-picker.component.html',
  imports: [CommonModule],
  styles: [``],
})
export class SoliasDatePickerComponent implements AfterViewInit {
  @ViewChild('calendarPopover') calendarPopover!: ElementRef<HTMLDivElement>;
  @Input() selectedDate: Date | null = null; // Input for two-way binding
  @Output() selectedDateChange = new EventEmitter<Date>(); // Output for two-way binding

  showCalendar: boolean = false; // Toggle calendar visibility
  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();
  weeks: Date[][] = [];

  constructor() {
    this.generateCalendar();
  }

  ngAfterViewInit(): void {
    // Adjust popover position dynamically
    const popover = this.calendarPopover.nativeElement;
    popover.addEventListener('toggle', () => {
      if (popover.matches(':popover-open') && popover.previousElementSibling) {
        const inputRect =
          popover.previousElementSibling.getBoundingClientRect();
        const popoverRect = popover.getBoundingClientRect();

        // Check if popover overflows the viewport
        if (inputRect.bottom + popoverRect.height > window.innerHeight) {
          popover.style.top = `${inputRect.top - popoverRect.height - 1}px`;
          popover.style.left = `${inputRect.left - 1}px`;
        } else {
          popover.style.top = `${inputRect.bottom + 1}px`;
          popover.style.left = `${inputRect.left - 1}px`;
        }
      }
    });
  }

  // Toggle calendar visibility
  toggleCalendar(): void {
    this.showCalendar = !this.showCalendar;
  }

  // Generate the calendar grid for the current month
  generateCalendar(): void {
    this.weeks = [];
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);
    const startDay = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    let week: Date[] = [];
    for (let i = 0; i < startDay; i++) {
      week.push(
        new Date(this.currentYear, this.currentMonth, 0 - (startDay - i - 1))
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
      week.push(new Date(this.currentYear, this.currentMonth, i));
      if (week.length === 7) {
        this.weeks.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      for (let i = week.length; i < 7; i++) {
        week.push(new Date(this.currentYear, this.currentMonth + 1, i + 1));
      }
      this.weeks.push(week);
    }
  }

  // Navigate to the previous month
  previousMonth(): void {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.generateCalendar();
  }

  // Navigate to the next month
  nextMonth(): void {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateCalendar();
  }

  // Select a date
  selectDate(date: Date): void {
    this.selectedDate = date;
    this.selectedDateChange.emit(date);
    this.showCalendar = false; // Hide calendar after selection
  }

  // Check if a date is the selected date
  isSelectedDate(date: Date): boolean {
    return (
      this.selectedDate !== null &&
      date.getDate() === this.selectedDate.getDate() &&
      date.getMonth() === this.selectedDate.getMonth() &&
      date.getFullYear() === this.selectedDate.getFullYear()
    );
  }

  // Check if a date is in the current month
  isCurrentMonth(date: Date): boolean {
    return date.getMonth() === this.currentMonth;
  }
}
