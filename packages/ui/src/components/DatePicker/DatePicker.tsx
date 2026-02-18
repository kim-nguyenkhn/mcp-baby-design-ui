import React, { useState, useRef, useEffect, useId, useCallback } from "react";
import { cn } from "../../lib/utils";
import { Calendar, ChevronLeft, ChevronRight } from "../Icons";
import {
  datePickerInputVariants,
  datePickerCalendarVariants,
  datePickerDayCellVariants,
  datePickerLabelVariants,
  datePickerNavButtonVariants,
} from "./date-picker.variants";

export interface DatePickerProps {
  /** Selected date */
  value?: Date | null;
  /** Change handler */
  onChange?: (date: Date | null) => void;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Placeholder text */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Label text */
  label?: string;
  /** Date format for display */
  format?: string;
  /** Additional class names */
  className?: string;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDate(date: Date, format: string): string {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = String(date.getFullYear());

  return format
    .replace("DD", dd)
    .replace("MM", mm)
    .replace("YYYY", yyyy);
}

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value = null,
      onChange,
      minDate,
      maxDate,
      placeholder = "Select date",
      disabled = false,
      label,
      format = "MM/DD/YYYY",
      className,
    },
    ref,
  ) => {
    const today = new Date();
    const [isOpen, setIsOpen] = useState(false);
    const [viewMonth, setViewMonth] = useState(
      value ? value.getMonth() : today.getMonth(),
    );
    const [viewYear, setViewYear] = useState(
      value ? value.getFullYear() : today.getFullYear(),
    );
    const containerRef = useRef<HTMLDivElement>(null);
    const generatedId = useId();

    const isDateDisabled = useCallback(
      (date: Date): boolean => {
        if (minDate) {
          const min = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
          if (date < min) return true;
        }
        if (maxDate) {
          const max = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
          if (date > max) return true;
        }
        return false;
      },
      [minDate, maxDate],
    );

    const handlePrevMonth = () => {
      if (viewMonth === 0) {
        setViewMonth(11);
        setViewYear((y) => y - 1);
      } else {
        setViewMonth((m) => m - 1);
      }
    };

    const handleNextMonth = () => {
      if (viewMonth === 11) {
        setViewMonth(0);
        setViewYear((y) => y + 1);
      } else {
        setViewMonth((m) => m + 1);
      }
    };

    const handleSelectDate = (date: Date) => {
      if (isDateDisabled(date)) return;
      onChange?.(date);
      setIsOpen(false);
    };

    const handleToggle = () => {
      if (disabled) return;
      setIsOpen((prev) => {
        if (!prev && value) {
          setViewMonth(value.getMonth());
          setViewYear(value.getFullYear());
        }
        return !prev;
      });
    };

    // Close on outside click
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Build calendar grid
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
    const calendarDays: Array<{ date: Date; isCurrentMonth: boolean }> = [];

    // Previous month's trailing days
    const prevMonthDays = getDaysInMonth(
      viewMonth === 0 ? viewYear - 1 : viewYear,
      viewMonth === 0 ? 11 : viewMonth - 1,
    );
    for (let i = firstDay - 1; i >= 0; i--) {
      calendarDays.push({
        date: new Date(
          viewMonth === 0 ? viewYear - 1 : viewYear,
          viewMonth === 0 ? 11 : viewMonth - 1,
          prevMonthDays - i,
        ),
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      calendarDays.push({
        date: new Date(viewYear, viewMonth, d),
        isCurrentMonth: true,
      });
    }

    // Next month's leading days to fill the grid
    const remaining = 42 - calendarDays.length;
    for (let d = 1; d <= remaining; d++) {
      calendarDays.push({
        date: new Date(
          viewMonth === 11 ? viewYear + 1 : viewYear,
          viewMonth === 11 ? 0 : viewMonth + 1,
          d,
        ),
        isCurrentMonth: false,
      });
    }

    const displayText = value ? formatDate(value, format) : placeholder;

    return (
      <div ref={ref} className={cn("flex flex-col gap-1.5 w-full", className)}>
        {label && (
          <label className={cn(datePickerLabelVariants())}>{label}</label>
        )}
        <div ref={containerRef} className="relative">
          <button
            type="button"
            onClick={handleToggle}
            disabled={disabled}
            className={cn(datePickerInputVariants({ hasError: false }))}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            data-testid="datepicker-trigger"
          >
            <span
              className={cn(
                value ? "text-neutral-800" : "text-neutral-400",
              )}
            >
              {displayText}
            </span>
            <Calendar size={16} className="text-neutral-400" />
          </button>

          {isOpen && (
            <div
              role="dialog"
              aria-label="Calendar"
              className={cn(datePickerCalendarVariants())}
              data-testid="datepicker-calendar"
            >
              {/* Header */}
              <div className="mb-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className={cn(datePickerNavButtonVariants())}
                  aria-label="Previous month"
                  data-testid="datepicker-prev"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-sm font-semibold text-neutral-800" data-testid="datepicker-month-year">
                  {MONTHS[viewMonth]} {viewYear}
                </span>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className={cn(datePickerNavButtonVariants())}
                  aria-label="Next month"
                  data-testid="datepicker-next"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 gap-0 mb-1" role="grid">
                {DAYS.map((day) => (
                  <div
                    key={day}
                    className="flex h-8 w-8 items-center justify-center text-xs font-medium text-neutral-500"
                  >
                    {day}
                  </div>
                ))}

                {/* Day cells */}
                {calendarDays.map(({ date, isCurrentMonth }, index) => {
                  const isDayDisabled = isDateDisabled(date);
                  const isDaySelected = value ? isSameDay(date, value) : false;
                  const isDayToday = isSameDay(date, today);

                  return (
                    <div
                      key={index}
                      role="gridcell"
                      aria-selected={isDaySelected || undefined}
                      aria-disabled={isDayDisabled || undefined}
                      onClick={() =>
                        !isDayDisabled && isCurrentMonth && handleSelectDate(date)
                      }
                      className={cn(
                        datePickerDayCellVariants({
                          isSelected: isDaySelected,
                          isToday: isDayToday && !isDaySelected,
                          isDisabled: isDayDisabled,
                          isOutsideMonth: !isCurrentMonth,
                        }),
                      )}
                      data-testid={
                        isCurrentMonth
                          ? `datepicker-day-${date.getDate()}`
                          : undefined
                      }
                    >
                      {date.getDate()}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
);

DatePicker.displayName = "DatePicker";
