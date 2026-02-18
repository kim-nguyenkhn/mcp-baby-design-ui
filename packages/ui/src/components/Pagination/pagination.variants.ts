import { cva } from "class-variance-authority";

export const paginationVariants = cva(
  "flex items-center gap-1",
  {
    variants: {},
    defaultVariants: {},
  },
);

export const paginationItemVariants = cva(
  [
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "min-w-[36px] h-9 px-2",
  ],
  {
    variants: {
      active: {
        true: "bg-primary-500 text-white hover:bg-primary-600",
        false: "bg-transparent text-neutral-800 hover:bg-neutral-100",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);
