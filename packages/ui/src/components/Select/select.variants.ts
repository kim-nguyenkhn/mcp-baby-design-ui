import { cva } from "class-variance-authority";

export const selectTriggerVariants = cva(
  [
    "flex w-full items-center justify-between rounded-lg border bg-white px-3 py-2 text-sm",
    "transition-colors placeholder:text-neutral-400",
    "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
    "disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-50",
  ],
  {
    variants: {
      hasError: {
        true: "border-error-500 focus:ring-error-500 focus:border-error-500",
        false: "border-neutral-300",
      },
      isOpen: {
        true: "ring-2 ring-primary-500 border-primary-500",
        false: "",
      },
    },
    defaultVariants: {
      hasError: false,
      isOpen: false,
    },
  },
);

export const selectDropdownVariants = cva(
  [
    "absolute z-50 mt-1 w-full rounded-lg border border-neutral-200 bg-white shadow-lg",
    "max-h-60 overflow-auto",
  ],
);

export const selectOptionVariants = cva(
  [
    "flex items-center gap-2 px-3 py-2 text-sm cursor-pointer transition-colors",
  ],
  {
    variants: {
      isActive: {
        true: "bg-primary-50 text-primary-700",
        false: "text-neutral-800 hover:bg-neutral-50",
      },
      isDisabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      isActive: false,
      isDisabled: false,
    },
  },
);

export const selectLabelVariants = cva("text-sm font-medium text-neutral-700");

export const selectTagVariants = cva(
  "inline-flex items-center gap-1 rounded bg-primary-100 text-primary-700 px-1.5 py-0.5 text-xs",
);
