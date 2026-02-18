import { cva } from "class-variance-authority";

export const sliderContainerVariants = cva("flex flex-col gap-2 w-full");

export const sliderLabelVariants = cva("flex items-center justify-between text-sm");

export const sliderTrackVariants = cva(
  "relative h-2 w-full rounded-full",
  {
    variants: {
      disabled: {
        true: "bg-neutral-200 cursor-not-allowed opacity-50",
        false: "bg-neutral-200 cursor-pointer",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  },
);

export const sliderFilledTrackVariants = cva("absolute h-full rounded-full bg-primary-500");

export const sliderThumbVariants = cva(
  [
    "absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-2 border-primary-500 shadow",
    "transition-shadow",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
    "hover:shadow-md",
  ],
  {
    variants: {
      disabled: {
        true: "cursor-not-allowed border-neutral-300",
        false: "cursor-grab active:cursor-grabbing",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  },
);
