import { cva } from "class-variance-authority";

export const radioGroupVariants = cva("flex", {
  variants: {
    orientation: {
      horizontal: "flex-row gap-4",
      vertical: "flex-col gap-2",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export const radioOuterVariants = cva(
  [
    "inline-flex items-center justify-center h-5 w-5 shrink-0 rounded-full border-2 transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
  ],
  {
    variants: {
      checked: {
        true: "border-primary-500",
        false: "border-neutral-300",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "cursor-pointer",
      },
    },
    defaultVariants: {
      checked: false,
      disabled: false,
    },
  },
);

export const radioInnerVariants = cva(
  "rounded-full transition-transform",
  {
    variants: {
      checked: {
        true: "h-2.5 w-2.5 bg-primary-500 scale-100",
        false: "h-2.5 w-2.5 bg-transparent scale-0",
      },
    },
    defaultVariants: {
      checked: false,
    },
  },
);

export const radioLabelVariants = cva("text-sm text-neutral-800 select-none", {
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
