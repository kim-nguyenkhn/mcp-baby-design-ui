import { cva } from "class-variance-authority";

export const datePickerInputVariants = cva(
  [
    "flex w-full items-center justify-between rounded-lg border bg-white px-3 py-2 text-sm",
    "transition-colors",
    "focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500",
    "disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-50",
  ],
  {
    variants: {
      hasError: {
        true: "border-error-500",
        false: "border-neutral-300",
      },
    },
    defaultVariants: {
      hasError: false,
    },
  },
);

export const datePickerCalendarVariants = cva(
  "absolute z-50 mt-1 rounded-lg border border-neutral-200 bg-white p-4 shadow-lg",
);

export const datePickerDayCellVariants = cva(
  [
    "flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors",
  ],
  {
    variants: {
      isSelected: {
        true: "bg-primary-500 text-white font-semibold",
        false: "",
      },
      isToday: {
        true: "border border-primary-500",
        false: "",
      },
      isDisabled: {
        true: "text-neutral-300 cursor-not-allowed",
        false: "cursor-pointer hover:bg-primary-50",
      },
      isOutsideMonth: {
        true: "text-neutral-300",
        false: "text-neutral-800",
      },
    },
    defaultVariants: {
      isSelected: false,
      isToday: false,
      isDisabled: false,
      isOutsideMonth: false,
    },
  },
);

export const datePickerLabelVariants = cva("text-sm font-medium text-neutral-700");

export const datePickerNavButtonVariants = cva(
  [
    "inline-flex h-7 w-7 items-center justify-center rounded-full",
    "text-neutral-600 hover:bg-neutral-100 transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
  ],
);
