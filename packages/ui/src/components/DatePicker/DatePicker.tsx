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
    const [focusedDay, setFocusedDay] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const generatedId = useId();
    const triggerId = `${generatedId}-trigger`;

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
        if (!prev) {
          if (value) {
            setViewMonth(value.getMonth());
            setViewYear(value.getFullYear());
          }
          // Focus the selected day, or today, or the 1st
          const initialDay = value ? value.getDate() : (
            (!value && viewMonth === today.getMonth() && viewYear === today.getFullYear())
              ? today.getDate()
              : 1
          );
          setFocusedDay(initialDay);
        } else {
          setFocusedDay(null);
        }
        return !prev;
      });
    };

    const handleGridKeyDown = (e: React.KeyboardEvent) => {
      if (!focusedDay) return;
      const daysCount = getDaysInMonth(viewYear, viewMonth);
      let newDay = focusedDay;
      let monthChanged = false;

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          if (focusedDay >= daysCount) {
            handleNextMonth();
            newDay = 1;
            monthChanged = true;
          } else {
            newDay = focusedDay + 1;
          }
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (focusedDay <= 1) {
            handlePrevMonth();
            const prevDays = getDaysInMonth(
              viewMonth === 0 ? viewYear - 1 : viewYear,
              viewMonth === 0 ? 11 : viewMonth - 1,
            );
            newDay = prevDays;
            monthChanged = true;
          } else {
            newDay = focusedDay - 1;
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          if (focusedDay + 7 > daysCount) {
            handleNextMonth();
            newDay = (focusedDay + 7) - daysCount;
            monthChanged = true;
          } else {
            newDay = focusedDay + 7;
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (focusedDay - 7 < 1) {
            handlePrevMonth();
            const prevDays = getDaysInMonth(
              viewMonth === 0 ? viewYear - 1 : viewYear,
              viewMonth === 0 ? 11 : viewMonth - 1,
            );
            newDay = prevDays + (focusedDay - 7);
            monthChanged = true;
          } else {
            newDay = focusedDay - 7;
          }
          break;
        case "Home":
          e.preventDefault();
          newDay = 1;
          break;
        case "End":
          e.preventDefault();
          newDay = daysCount;
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          {
            const selectedDate = new Date(viewYear, viewMonth, focusedDay);
            if (!isDateDisabled(selectedDate)) {
              handleSelectDate(selectedDate);
            }
          }
          return;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          setFocusedDay(null);
          return;
        default:
          return;
      }

      setFocusedDay(newDay);
    };

    // Focus the active day cell when focusedDay changes
    useEffect(() => {
      if (isOpen && focusedDay && gridRef.current) {
        const cell = gridRef.current.querySelector<HTMLElement>(
          `[data-day="${focusedDay}"]`,
        );
        cell?.focus();
      }
    }, [isOpen, focusedDay, viewMonth, viewYear]);

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
          <label htmlFor={triggerId} className={cn(datePickerLabelVariants())}>{label}</label>
        )}
        <div ref={containerRef} className="relative">
          <button
            type="button"
            id={triggerId}
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

              {/* Day grid */}
              <div ref={gridRef} role="grid" aria-label="Calendar dates" onKeyDown={handleGridKeyDown}>
                {/* Column headers */}
                <div role="row" className="grid grid-cols-7 gap-0 mb-1">
                  {DAYS.map((day) => (
                    <div
                      key={day}
                      role="columnheader"
                      className="flex h-8 w-8 items-center justify-center text-xs font-medium text-neutral-500"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Day rows (7 days per row) */}
                {Array.from({ length: Math.ceil(calendarDays.length / 7) }, (_, rowIndex) => (
                  <div key={rowIndex} role="row" className="grid grid-cols-7 gap-0">
                    {calendarDays.slice(rowIndex * 7, rowIndex * 7 + 7).map(({ date, isCurrentMonth }, cellIndex) => {
                      const isDayDisabled = isDateDisabled(date);
                      const isDaySelected = value ? isSameDay(date, value) : false;
                      const isDayToday = isSameDay(date, today);
                      const isFocused = isCurrentMonth && focusedDay === date.getDate();

                      return (
                        <div
                          key={rowIndex * 7 + cellIndex}
                          role="gridcell"
                          aria-selected={isDaySelected || undefined}
                          aria-disabled={isDayDisabled || undefined}
                          tabIndex={isFocused ? 0 : -1}
                          data-day={isCurrentMonth ? date.getDate() : undefined}
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
                            isFocused && "ring-2 ring-primary-500 ring-offset-1",
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
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
);

DatePicker.displayName = "DatePicker";
