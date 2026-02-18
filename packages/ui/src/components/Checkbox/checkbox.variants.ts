import { cva } from "class-variance-authority";

export const checkboxVariants = cva(
  [
    "inline-flex items-center justify-center h-5 w-5 shrink-0 rounded border-2 transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
  ],
  {
    variants: {
      checked: {
        true: "bg-primary-500 border-primary-500 text-white",
        false: "border-neutral-300 bg-white",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "cursor-pointer",
      },
      hasError: {
        true: "border-error-500",
        false: "",
      },
    },
    defaultVariants: {
      checked: false,
      disabled: false,
      hasError: false,
    },
  },
);

export const checkboxLabelVariants = cva("text-sm text-neutral-800 select-none", {
  variants: {
    disabled: {
      true: "opacity-50 cursor-not-allowed",
      false: "cursor-pointer",
    },
  },
  defaultVariants: {
    disabled: false,
  },
});
