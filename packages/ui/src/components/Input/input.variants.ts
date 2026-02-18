import { cva } from "class-variance-authority";

export const inputVariants = cva(
  [
    "w-full rounded-lg border bg-white px-3 py-2 text-sm text-neutral-800",
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
      hasLeftIcon: {
        true: "pl-10",
        false: "",
      },
      hasRightIcon: {
        true: "pr-10",
        false: "",
      },
    },
    defaultVariants: {
      hasError: false,
      hasLeftIcon: false,
      hasRightIcon: false,
    },
  },
);

export const inputWrapperVariants = cva("flex flex-col gap-1.5 w-full");

export const inputLabelVariants = cva("text-sm font-medium text-neutral-700");

export const inputHelperVariants = cva("text-xs", {
  variants: {
    hasError: {
      true: "text-error-500",
      false: "text-neutral-500",
    },
  },
  defaultVariants: {
    hasError: false,
  },
});
