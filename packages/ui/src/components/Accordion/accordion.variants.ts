import { cva } from "class-variance-authority";

export const accordionVariants = cva(
  "w-full divide-y divide-neutral-200 border border-neutral-200 rounded-lg",
  {
    variants: {},
    defaultVariants: {},
  },
);

export const accordionTriggerVariants = cva(
  [
    "flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium",
    "text-neutral-800 transition-colors hover:bg-neutral-50",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {},
    defaultVariants: {},
  },
);

export const accordionContentVariants = cva(
  "overflow-hidden transition-all duration-200 ease-in-out",
  {
    variants: {
      expanded: {
        true: "max-h-[1000px] opacity-100",
        false: "max-h-0 opacity-0",
      },
    },
    defaultVariants: {
      expanded: false,
    },
  },
);
