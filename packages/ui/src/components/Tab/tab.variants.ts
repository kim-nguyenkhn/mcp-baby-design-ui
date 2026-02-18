import { cva } from "class-variance-authority";

export const tabListVariants = cva(
  "flex border-neutral-200",
  {
    variants: {
      orientation: {
        horizontal: "flex-row border-b",
        vertical: "flex-col border-r",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  },
);

export const tabItemVariants = cva(
  [
    "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "cursor-pointer whitespace-nowrap",
  ],
  {
    variants: {
      active: {
        true: "text-primary-600 border-primary-500",
        false: "text-neutral-600 border-transparent hover:text-neutral-800 hover:border-neutral-300",
      },
      orientation: {
        horizontal: "border-b-2 -mb-px",
        vertical: "border-r-2 -mr-px",
      },
    },
    defaultVariants: {
      active: false,
      orientation: "horizontal",
    },
  },
);

export const tabPanelVariants = cva(
  "p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
  {
    variants: {},
    defaultVariants: {},
  },
);
